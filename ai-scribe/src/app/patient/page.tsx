'use client'
import React, { Fragment, useCallback } from 'react'
import { Listbox, Transition  } from '@headlessui/react'
import useSWR from 'swr'
import { useState } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import {useRouter} from 'next/navigation'

//patient page which returns list of patients from the database

//uses SWR to fetch data from the database
 
const fetcher = (url: string) => fetch(url).then((res) => res.json());


export default function page() {
  
      const { data, error, isLoading } = useSWR(
        "/api/patient",
        fetcher
      );
      const [selectedPatient, setSelectedPatient] = useState(null);
      

      const router = useRouter()

      const handleStartConsultation = useCallback(() => {
          fetch(`/api/patient/${selectedPatient.id}/consultation`,
            {method: 'POST'})
            .then((response) => {
              return response.json()
            })
            .then((consultation) => {
              console.log("consultation:", consultation)
              router.push(`/consultation/${consultation.id}`)
            })
      }, [selectedPatient])

      if (error) return "An error has occurred.";

      if (isLoading) return "Loading...";
      
    return (
      
    <div className="fixed top-16 w-72">
    <Listbox value={selectedPatient} onChange={setSelectedPatient}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block truncate">{selectedPatient ? selectedPatient.firstName + " " + selectedPatient.lastname : "Select Patient"}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-100 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            
            {data.map((patient: any, patientIdx: any) => (
              <><Listbox.Option
                key={patientIdx}
                className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-slate-200 text-amber-900' : 'text-gray-900'}`}
                value={patient}
              >
                {({ selected }) => (
                  <>
                  <><img className="h-7 w-7 absolute left-0 inset-y-1"src="personIcon.png" alt="Icon of person"></img></>
                    <span
                      className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                    >
                      {patient.firstName + " " + patient.lastname}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>  
                )}
              </Listbox.Option>  
              </>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
    <button className="bg-slate-700 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded" type="button" onClick={handleStartConsultation}>Start Consultation</button>
    </div>
    )
     }
