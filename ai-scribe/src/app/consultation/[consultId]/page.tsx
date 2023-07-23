"use client";

import React from "react";
import useSWR from "swr";
import Chat from "../../components/Chat";
import { useParams } from "next/navigation";
import { POST } from "@/app/api/consultation/[consultId]/chat/route";

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

    if (!data) return (
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md md:max-w-2xl">
        <h1 className="text-2xl">Inital Consultation</h1>
        <Chat consultId={consultId} />
        
        </div>
    )

    


    if (error) return "An error has occurred.";

    if (isLoading) return "Loading...";

    
  

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md md:max-w-2xl">
      <h1 className="text-2xl">patient name</h1>
      <div>{data.seenOn}</div>
      <div>Consultation Summary</div>

      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div>
          <Chat consultId={consultId} />
        </div>
      </div>
    </div>
  );
}
