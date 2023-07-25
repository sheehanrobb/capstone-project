
import React, { use, useEffect, useState,} from 'react';
import { useSpeechContext } from '@speechly/react-client';
import 'regenerator-runtime/runtime';
import {IoMicCircleSharp, IoMicOffCircle} from 'react-icons/io5';
 



export default function SpeechlyDictaphone() {
  const {segment, attachMicrophone, listening, start, stop} = useSpeechContext();
  const [transcripts, setTranscripts] = useState<string[]>([]);
  const [tentative, setTentative] = useState<string>("");

  
useEffect(() => {
  if (segment) {
    const transcript = segment.words.map((word) => word.value).join(' ');
    setTentative(transcript)
    if (segment.isFinal) {
      setTentative("");
      setTranscripts((current): any[] => [...current, segment]);
      console.log(tentative);
    console.log(transcript);
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
      <button onClick={handleClick} className=" text-white p-3 inline-flex rounded full bg-slate-700 hover:bg-slate-500 font-bold py-4 px-8">
        {listening ? <IoMicOffCircle className="animate-ping inline-flex rounded-full"/>: <IoMicCircleSharp inline-flex/>}
      </button>
      <div>{transcripts.map((transcript: any) => <p className='fixed align-center flex w-full max-w-md bottom-0 border'>{transcript}</p>)}
      <p>{tentative}</p>
      </div>
    
      </div>

  );
}
