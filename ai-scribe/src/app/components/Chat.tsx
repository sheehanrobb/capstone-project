'use client'
 
import { useChat } from 'ai/react'
import React, { FC } from 'react'
import Dictaphone from './Dicataphone'
import { SpeechProvider } from '@speechly/react-client'
import {RiOpenaiFill, BsFilePersonFill } from 'react-icons/ri'



 
export default function Chat({consultId}: {consultId: string}) {
  
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api:`/api/consultation/${consultId}/chat`,
  })


  
  
 
  return (
    <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
      {messages.map(m => (
        <div  key={m.id}>
          {m.role === 'user' ? "User" : <RiOpenaiFill className="inline-flex w-10 h-10"/>}
          {m.content}
        </div>
      ))}
 
      <form onSubmit={handleSubmit}>
        <label>
          Say something...
        
          <input
            key="input"
            className="fixed align-center flex w-full max-w-md bottom-0 border border-gray-300 rounded mb-8 shadow-xl p-2"
            type="text"
            value={input}
            onChange={handleInputChange}>
          </input>
          </label>
          
      </form>
    <div>
  
    
    </div>
    </div>
  )
}