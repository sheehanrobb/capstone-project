'use client'
 
import { useChat } from 'ai/react'
import React, { FC } from 'react'
import Dictaphone from './Dicataphone'
import "regenerator-runtime/runtime.js";



 
export default function Chat({consultId}: {consultId: string}) {
  
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api:`/api/consultation/${consultId}/chat`,
  })


  
  
 
  return (
    <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
      {messages.map(m => (
        <div key={m.id}>
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content}
        </div>
      ))}
 
      <form onSubmit={handleSubmit}>
        <label>
          Say something...
          <input
            key="input"
            className="fixed align-center flex w-full max-w-md bottom-0 border border-gray-300 rounded mb-8 shadow-xl p-2"
            value={input}
            onChange={handleInputChange}
            
          >
            
          </input>
          <button type="submit" className='fixed blue-800'>Send</button>
        
        </label>
        
      </form>
    <div>
    
    </div>
    </div>
  )
}