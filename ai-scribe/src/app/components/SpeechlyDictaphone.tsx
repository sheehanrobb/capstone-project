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
    <div className="bg-slate-200">
      <button
        onClick={handleClick}
        className=" text-white p-3 inline-flex rounded full bg-slate-700 hover:bg-slate-500 font-bold py-4 px-8"
      >
        {listening ? (
          <IoMicCircleSharp className="animate-ping inline-flex rounded-full" />
        ) : (
          <IoMicOffCircle className="inline-flex rounded-full" />
        )}
      </button>
    </div>
  );
}
