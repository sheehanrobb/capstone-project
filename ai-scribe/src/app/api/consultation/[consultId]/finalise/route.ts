//send hx  of chat plus a system prompt to generate a summary and generate a training plan
//save summary to training plan and database
//respond with training plan and summary

import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import prisma from "@/lib/prismadb";
import { chatbotPrompt } from "@/app/helpers/chatbotPrompt";

// for configuration of the openai api
const config = new Configuration({
  organization: "org-O8mSxa4OReFk9vXjyIO8xmjG",
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

// for the openai api
const openai = new OpenAIApi(config);

//  request to create a new transcript/chat
export async function POST(
  req: Request,
  { params }: { params: { consultId: string } }
) {
  /*
  json is:
  messages: [
    { 
       role: "user" | role: "assistant"  (note system or server-side messages NEVER included)
       content: "the message itself"
    }
  ]
  */

  const transcripts = await prisma.transcript.findMany({
    where: {
        consultation: {
            id: params.consultId
        } 
    }
  })

  console.log("consultId: ", params.consultId);
  console.log("transcripts", transcripts);

  const messages = transcripts.map((transcript) => ({ role: transcript.role, content: transcript.message }))

  const chatMessages = [
    { role: "system", content: `${chatbotPrompt}` },
    ...messages,
    { role: "system", content: "Summarize the above consultation notes for the next consultation, and provide a detailed exercise plan in table format." }
  ];

  console.log("chatMessage: ", chatMessages);

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo", // gpt-3.5-turbo-16k or gpt-4 (8k of context)
    stream: true,
    temperature: 0.6,
    messages: chatMessages,
  });

  const stream = OpenAIStream(response, {
    onStart: async () => {
      console.log("started streaming");
    },

    onToken: async (token) => {},
    onCompletion: async (completion: string) => {
      // this callback is called when the stream completes
      // you can use this to save the final completion to the database
      // instead of writing to transcript, write to summary in consultation
    //   const transcript = await prisma.transcript.create({
    //     data: {
    //       consultation: {
    //         connect: {
    //           id: params.consultId
    //         }
    //       },
    //       role: "assistant",
    //       message: completion,
    //       createdAt: new Date(),
    //     },
    //   });
      console.log("assistant transcript: ", completion);
    },
  });
  return new StreamingTextResponse(stream);
}
