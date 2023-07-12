'use client'
import "regenerator-runtime/runtime.js";
import Image from 'next/image'
import styles from './page.module.css'
import Dictaphone from './components/speech'
import Chat from "./components/chatBox";

export const runtime = "edge"

export default function Home() {
  return (
    <main >
    
        <div>
          <Dictaphone>

          </Dictaphone>
          <Chat></Chat>
        </div>
        
    </main>
  )
}
