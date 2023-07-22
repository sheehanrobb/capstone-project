"use client";

import React from "react";
import useSWR from "swr";
//import Chat from "../../components/Chat";
import { useParams } from "next/navigation";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function page() {
  const { consultId } = useParams();
  const { data, error, isLoading } = useSWR(
    `/api/consultation/${consultId}`,
    fetcher
  );

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md md:max-w-2xl">
      <h1 className="text-2xl">Patients</h1>
      <div>Consultation Date</div>
      <div>Consultation Summary</div>

      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div>
          {/* <Chat consultId={consultId} /> */}
        </div>
      </div>
    </div>
  );
}
