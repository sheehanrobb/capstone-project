import { Configuration, OpenAIApi } from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'

//Vercel recommends to run on the edge runtime
// export const runtime = 'edge'

const config = new Configuration({
  organization: 'org-O8mSxa4OReFk9vXjyIO8xmjG',
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  
})

const openai = new OpenAIApi(config)
 

 
export async function POST(req: Request) {
  //extract the prompt from the request body
  const { prompt } = await req.json()

  //request to OPENAI api based on the prompt
  const response = await openai.createCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    temperature: 0.6,
    prompt: 'What is Next.js?',
  })
 
  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}