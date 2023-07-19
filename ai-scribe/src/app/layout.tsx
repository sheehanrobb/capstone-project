import './globals.css'
import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from './components/ui/NavBar'
import "tailwindcss/tailwind.css"


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ai Scribe',
  description: 'A web app that transcribes your medical notes by speech, and integrates with AI to provide suggestions and corrections',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <a href="https://www.flaticon.com/free-icons/artificial-intelligence" title="artificial intelligence icons">Artificial intelligence icons created by Triangle Squad - Flaticon</a>
        <NavBar />
        {children}</body>
    </html>
  )
}
