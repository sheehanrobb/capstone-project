"use client";

import { useChat } from "ai/react";
import React, { FC, useRef } from "react";
import Dictaphone from "./Dicataphone";
import { RiOpenaiFill, RiUser3Line } from "react-icons/ri";
import SpeechlyDictaphone from "./SpeechlyDictaphone";
import { SpeechProvider } from "@speechly/react-client";


export default function Chat({ consultId }: { consultId: string }) {
  const { messages, input, handleInputChange, handleSubmit, append, setInput } = useChat({
    api: `/api/consultation/${consultId}/chat`,
  });

  const handleFinalTranscript = (transcript: string) => {
    append({ role: "user", content: transcript });
  }

  const handleTentativeTranscript = (transcript: string) => {
    setInput(transcript);
  }

  return (
    <div className="mx-auto w-full max-w-1xl py-24 flex flex-col stretch">
      {messages.map((m) => (
        <div key={m.id}>
          {m.role === "user" ? (
            <RiUser3Line className="inline-flex w-10 h-10" />
          ) : (
            <RiOpenaiFill className="inline-flex w-10 h-10" />
          )}
          {m.content}
        </div>
      ))}

      <SpeechProvider
        appId={process.env.NEXT_PUBLIC_SPEECHLY_APP_ID}
      >
        <SpeechlyDictaphone onFinalTranscript={handleFinalTranscript} onTentativeTranscript={handleTentativeTranscript}></SpeechlyDictaphone>
      </SpeechProvider>

      <form onSubmit={handleSubmit}>
        <label>
          Say something...
          <input
            key="input"
            className="fixed align-center flex w-full max-w-md bottom-0 border border-gray-300 rounded mb-8 shadow-xl p-2"
            type="text"
            value={input}
            onChange={handleInputChange}
          ></input>
        </label>
      </form>
      <div></div>
    </div>
  );
}
