'use client'
import "regenerator-runtime/runtime.js";
import Image from 'next/image'
import styles from './page.module.css'
import Dictaphone from './components/speech'

export default function Home() {
  return (
    <main >
    
        <div>
          <Dictaphone>

          </Dictaphone>
        </div>
        
    </main>
  )
}
