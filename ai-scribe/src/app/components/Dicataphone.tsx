import {FC} from 'react'
import React from 'react';
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';



const speechlyAppId: string|undefined = process.env.NEXT_PUBLIC_SPEECHLY_APP_ID
console.log(speechlyAppId)
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(speechlyAppId as string);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

const Dictaphone:FC = () => {
  const {
    transcript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-NZ'});

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button className='bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded'
        onTouchStart={startListening}
        onMouseDown={startListening}
        onTouchEnd={SpeechRecognition.stopListening}
        onMouseUp={SpeechRecognition.stopListening}
      >Hold to talk</button>
      <p>{transcript}</p>
      <button onClick={resetTranscript}>Reset</button>
      
      
    </div>
  );
};
export default Dictaphone;