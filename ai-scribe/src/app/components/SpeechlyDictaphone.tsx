import React, { use, useEffect, useState } from "react";
import { useSpeechContext, SpeechSegment } from "@speechly/react-client";
import "regenerator-runtime/runtime";
import { IoMicCircleSharp, IoMicOffCircle } from "react-icons/io5";

interface SpeechlyDictaphoneProps {
  onTentativeTranscript: (transcript: string) => void;
  onFinalTranscript: (transcript: string) => void;
}

export default function SpeechlyDictaphone({
  onTentativeTranscript,
  onFinalTranscript,
}: SpeechlyDictaphoneProps) {
  const { segment, attachMicrophone, listening, start, stop } =
    useSpeechContext();

  useEffect(() => {
    if (segment) {
      const transcript = segment.words.map((word) => word.value).join(" ");
      if (segment.isFinal) {
        onFinalTranscript(transcript);
       } else {
        onTentativeTranscript(transcript);
      }
    }
  }, [segment]);

  const handleClick = async () => {
    if (listening) {
      await stop();
    } else {
      await attachMicrophone();
      await start();
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className=" text-white  flex-shrink inline-flex rounded-full bg-slate-700 hover:bg-indigo-500 font-bold py-5 px-5 fixed bottom-5 right-20"
      >
        {listening ? (
          <IoMicCircleSharp className="animate-ping inline-flex w-10 h-10 rounded-full shadow-md" />
        ) : (
          <IoMicOffCircle className=" inline-flex rounded-full w-10 h-10 shadow-md"  />
        )}
      </button>
    </div>
  );
}
