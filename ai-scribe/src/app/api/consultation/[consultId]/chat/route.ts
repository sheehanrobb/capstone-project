import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';



const config = new Configuration({
  organization:'org-O8mSxa4OReFk9vXjyIO8xmjG',
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
})

const openai = new OpenAIApi(config)
 

 
export async function GET(req: Request, {params}: {params: {consultId: string}}) {
  // const { prompt } = await req.json()
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    temperature: 0.6,
    messages: [{role: "system", content: "what is next.js?"},
                {role: "system", content: "and how do I use it?"}],
  })

  //console.log(response);
 
  const stream = OpenAIStream(response, {
    onStart: async() => {
      // this callback is called when the stream starts
      // you can use this to save the prompt (or messages for openai.createChatCompletion) to your database
      console.log('started stream')
      // save prompt to database here
    },
    onToken: async(token) => {
      // this callback is called for each token in the stream
      // you can use this to debug the stream
      console.log(token)
    },
    onCompletion: async(completion: string) => {
      // this callback is called when the stream completes
      // you can use this to save the final completion to the database
      console.log(completion)
      // save to database here
    }
  })
  return new StreamingTextResponse(stream)
}


 

// export async function GET(request: Request) {
//   return new Response('Hello, Next.js!', {
//     status: 200,
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//       'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//     },
//   })
// }