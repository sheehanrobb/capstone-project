import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import prisma from '@/lib/prismadb';
import { chatbotPrompt } from '@/app/helpers/chatbotPrompt';
import { assistantPrompt,
  assistantPrompt2,
  assistantPrompt3,
  assistantPrompt4,
  assistantPrompt5,
  assistantPrompt6,
  assistantPrompt7,
  assistantPrompt8,
  assistantPrompt9,
  assistantPrompt10,
  assistantPrompt11,
  assistantPrompt12,
  assistantPrompt13,
  assistantPrompt14  } from '@/app/helpers/assistantPrompt';
import { request } from 'http';
import { NextResponse } from 'next/server';


// for configuration of the openai api
const config = new Configuration({
  organization:'org-O8mSxa4OReFk9vXjyIO8xmjG',
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
})

// for the openai api
const openai = new OpenAIApi(config)
 

//  request to create a new transcript/chat 
export async function POST(req: Request, {params}: {params: {consultId: string}}) {
  const { prompt } = await req.json()
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    temperature: 0.6,
    messages: [{role: "system", content: `${chatbotPrompt}`},
                {role: "assistant", content: `${assistantPrompt}`},
                {role: "user", content: `${prompt}`},
                // {role: "assistant", content: `${assistantPrompt2}`},
                // {role: "user", content: `${prompt}`},
                // {role: "assistant", content: `${assistantPrompt3}`},
                // {role: "user", content: `${prompt}`},
                // {role: "assistant", content: `${assistantPrompt4}`},
                // {role: "user", content: `${prompt}`},
                // {role: "assistant", content: `${assistantPrompt5}`},
                // {role: "user", content: `${prompt}`},
                // {role: "assistant", content: `${assistantPrompt6}`},
                // {role: "user", content: `${prompt}`},
                // {role: "assistant", content: `${assistantPrompt7}`},
                // {role: "user", content: `${prompt}`},
                // {role: "assistant", content: `${assistantPrompt8}`},
                // {role: "user", content: `${prompt}`},
                // {role: "assistant", content: `${assistantPrompt9}`},
                // {role: "user", content: `${prompt}`},
                // {role: "assistant", content: `${assistantPrompt10}`},
                // {role: "user", content: `${prompt}`},
                // {role: "assistant", content: `${assistantPrompt11}`},
                // {role: "user", content: `${prompt}`},
                // {role: "assistant", content: `${assistantPrompt12}`},
                // {role: "user", content: `${prompt}`},
                // {role: "assistant", content: `${assistantPrompt13}`},
                // {role: "user", content: `${prompt}`},
                // {role: "assistant", content: `${assistantPrompt14}`},
              
                ],
  })

  console.log(response);

//stream the response from the openai api, and save the response to the database
 async function POST(req: Request) {
  // const { transcript } = await req.json()

  const saveTranscriptionToDatabase = async (transcript: string) => {
    try {
    await prisma.transcript.create({
      data: {
        consultationId: params.consultId,
        role: "user",
        message: transcript,
        createdAt: new Date(),
        }
      })} catch (error: any) {
          console.error("Error saving", error)
        }
    }
  }
  const saveCompletionToDatabase = async (completion: string) => {
    try {
    await prisma.transcript.create({
      data: {
        role: "assistant",
        message: completion,
        createdAt: new Date(),
        }
      })} catch (error: any) {
        console.error("Error saving", error)
      }
    
  


  const stream = OpenAIStream(response, {
  // this callback is called when the stream starts
    onStart: async ()  => {
      await saveTranscriptionToDatabase(transcript)
      
      console.log("started streaming")

    },
  
    onToken: async(token) => {
      // this callback is called for each token in the stream
      // you can use this to debug the stream
        console.log(token)
      },
    onCompletion: async(completion: string) => {
      // this callback is called when the stream completes
      // you can use this to save the final completion to the database
      await saveCompletionToDatabase(completion)
     
    },
      // save to database here
  });
  return new StreamingTextResponse(stream);
}
  }