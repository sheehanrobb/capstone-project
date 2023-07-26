'use client'

import Image from 'next/image'
import styles from './page.module.css'
import Dictaphone from './components/Dicataphone'
import Chat from "./components/Chat";
import { SpeechProvider } from '@speechly/react-client';
import SpeechlyDicataphone from './components/SpeechlyDictaphone.tsx'
import Dicataphone from './components/Dicataphone'
import 'regenerator-runtime/runtime'
import Example from './components/ui/Dropdown';
import ExampleList from './components/ui/List';



export default function Home() {
  return (
    <main>
      <div>
        <img src="AI.jpeg" alt="ai abstract" className='cover absolute flex-auto'></img>
        <h1 className="text-white text-right text-5xl font-serif absolute right-8 top-20">Welcome Sheehan</h1>
        <p className="text-xl text-white">Welcome to your dashboard</p>

        <div className="right-4 absolute">
        
        </div>
        
        
        
      </div>
    </main>
  );
}
