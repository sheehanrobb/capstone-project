"use client";

import React from "react";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { FiCopy } from "react-icons/fi";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function page() {
  const { consultId } = useParams();
  const { data, error, isLoading } = useSWR(
    //do I need to add /chat to the end of this?
    `/api/consultation/${consultId}`,
    fetcher
  );
  console.log(data);

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";

  return (
    <div className="max-w-3x1 mx-auto min-w-800 bg-white rounded-xl shadow-2xl lg:max-w-2xl space-x-4 p-2 h-screen">
      <h1 className="text-2xl space-x-4 text-slate-800 p-6 font-serif">
       Patient: {data[0].patient.firstName + " " + data[0].patient.lastname}
      </h1>
      <div className="text-slate-800">{data[0].patient.seenOn}</div>
      <div>{data[0].summary}</div>
     
    </div>
  );
}
