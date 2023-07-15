
import { Configuration, OpenAIApi } from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { NextResponse } from 'next/server'

//API connection
 
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(config)
 
//API route
 
export async function POST(req: Request) {
  const { prompt } = await req.json()
  const response = await openai.createCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    temperature: 0.6,
    prompt: prompt,
  })
 
  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}

 

export async function GET(request: Request) {
  return new Response('Hello, Next.js!', {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}