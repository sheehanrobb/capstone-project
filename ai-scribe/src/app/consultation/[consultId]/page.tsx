"use client";

import React from "react";
import useSWR from "swr";
import Chat from "../../components/Chat";
import { useParams } from "next/navigation";
import { POST } from "@/app/api/consultation/[consultId]/chat/route";
import "regenerator-runtime/runtime";
import SpeechlyDictaphone from "../../components/SpeechlyDictaphone";
import { SpeechProvider } from "@speechly/react-client";

// import "regenerator-runtime/"

//this page is for the consultation. It will display the patient's name, the date of the consultation
//the chat box, and the consultation summary
//uses SWR to fetch data from the database
//fetches the consultation id from the database

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function page() {
  const { consultId } = useParams();
  const { data, error, isLoading } = useSWR(
    //do I need to add /chat to the end of this?
    `/api/consultation/${consultId}`,
    fetcher

  );
    console.log(data);

    const handleChat = () => {
      fetch (`/api/consultation/${consultId}/chat`, {
        method: "POST"})
        .then((response) => response.json()
        .then((data) => {
          console.log(data);
        }))
        
    }

    const handleFinalise = () => {
      fetch(`/api/consultation/${consultId}/finalise`,
      {method: "POST"})
      .then((response) =>
        response.json()
      )
      .then((data) => {
        console.log(data);
      })
    }
    
  
//handles summary, have to write backend APi for this
    // const handleSummary = () => {
    //   fetch(`/api/consultation/${consultId}/finalise`,
    //   {method: "GET"})
    //   .then((response) => 
    //     response.json()
    //     )
    //     .then((data) => {
    //       console.log(data);
    //     })
    // }

    if (!data) return (
      <div className="max-w-3x1 mx-auto min-w-800 bg-white rounded-xl shadow-2xl lg:max-w-2xl space-x-4 p-2 h-screen">
        <h1 className="text-2xl space-x-4 text-slate-800 p-6">Inital Consultation</h1>
        {/* <div className="text-slate-800">Patient Name</div>
        <div className="text-slate-800">Date</div>
        <div className="text-slate-800">Time</div> */}
        <button className="bg-slate-700 hover:bg-slate-500 text-white font-bold py-4 px-8 rounded" onClick={handleFinalise}>Finalise Notes</button>
        
          <Chat consultId={consultId} />
          <SpeechProvider appId={process.env.NEXT_PUBLIC_SPEECHLY_APP_ID}
            debug 
            logSegments>
            <SpeechlyDictaphone>
              </SpeechlyDictaphone>
          </SpeechProvider>
      </div>
    )

    


    if (error) return "An error has occurred.";

    if (isLoading) return "Loading...";

    
  

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md md:max-w-2xl">
      <h1 className="text-2xl">patient name</h1>
      <div>{data.seenOn}</div>
      {/* <div>{handleSummary}</div> */}

      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div>
          <Chat consultId={consultId} />
        </div>
      </div>
    </div>
  );
}
