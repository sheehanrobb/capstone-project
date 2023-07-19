'use client'
import React, { Fragment } from 'react'
import { Listbox, Transition  } from '@headlessui/react'
import useSWR from 'swr'
import { useState } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

 
const fetcher = (url: string) => fetch(url).then((res) => res.json());


export default function page() {
    const { data, error, isLoading } = useSWR(
        "/api/patient",
        fetcher
      );
      const [selectedPatient, setSelectedPatient] = useState(null);
      if (error) return "An error has occurred.";
      if (isLoading) return "Loading...";
      console.log(data)
    return (
      
    <div className="fixed top-16 w-72">
    <Listbox value={selectedPatient} onChange={setSelectedPatient}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block truncate">{selectedPatient}select patient</span>
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
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {data.map((patient: any, patientIdx: any) => (
              <Listbox.Option
                key={patientIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                  }`
                }
                value={patient}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
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
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  </div>
// )
//         <Listbox>
//           <Listbox.Button>{selectedPatient}headlessui</Listbox.Button>
//           <Listbox.Options>
//             {data.map((patient) => (
//               <Listbox.Option
//                 key={patient.id}
//                 value={patient.id}
//               >
//                 {patient.firstName} {patient.lastName}
//               </Listbox.Option>
//             ))}
//           </Listbox.Options>
//         </Listbox>
      )
     }
