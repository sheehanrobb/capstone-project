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
  const { messages } = await req.json();

  console.log("consultId: ", params.consultId);

  const chatMessages = [
    { role: "system", content: `${chatbotPrompt}` },
    ...messages
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
      // this callback is called when the stream starts
      const latestMessage = messages.findLast(() => true);
      console.log("latestMessage: ", latestMessage);
      const transcript = await prisma.transcript.create({
        data: {
          consultation: {
            connect: {
              id: params.consultId
            }
          },
          role: latestMessage.role, // this is the same as "user"
          message: latestMessage.content,
          createdAt: new Date(),
        },
      });
      console.log("user transcript: ", transcript)

      console.log("started streaming");
    },

    onToken: async (token) => {
      // this callback is called for each token in the stream
      // you can use this to debug the stream
      console.log(token);
    },
    onCompletion: async (completion: string) => {
      // this callback is called when the stream completes
      // you can use this to save the final completion to the database
      const transcript = await prisma.transcript.create({
        data: {
          consultation: {
            connect: {
              id: params.consultId
            }
          },
          role: "assistant",
          message: completion,
          createdAt: new Date(),
        },
      });
      console.log("assistant transcript: ", transcript);
    },
  });
  return new StreamingTextResponse(stream);
}
