'use client'
import { useEffect, useId } from 'react'
import { Button } from '@/components/Button'
import { Fragment, useState } from 'react'
import { Transition } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/20/solid'

import { Timestamp, doc, setDoc } from "firebase/firestore";
import { db } from "../config";

export function SignUpForm() {
  let id = useId()
  const [number, setNumber] = useState("");
  const [show, setShow] = useState(false)
  let message = "Successfully saved number!"
  let description = "I'm looking forward to meeting you again"

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const handleInput = (e) => {
    const fieldValue = e.target.value;

    setNumber((prevState) => ({
      ...prevState,
      fieldValue
    }));
  }

  const handleForm = async () => {
    console.log(number)
    if (number !== "" && number.fieldValue !== "") {
      try {
        await setDoc(doc(db, "numbers", "number-" + getRandomInt(999999999)), {
          number: number,
          time: Timestamp.now()
        })
      } catch (error) {
        message = "Failed to save number!"
        description = "oops"
        console.log(error)
      }
      setShow(true)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  useEffect(() => {
    const form = document.getElementById("form");
    form.addEventListener('submit', handleSubmit);
  });

  return (
    <>
      <form className="relative isolate mt-8 flex items-center pr-1" id='form'>
        <label htmlFor={id} className="sr-only">
          Phone number
        </label>
        <input
          required
          type="text"
          name="phonenumber"
          id={id}
          placeholder="Phone number"
          className="peer w-0 flex-auto bg-transparent px-4 py-2.5 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-[0.8125rem]/6"
          onChange={handleInput}
        />
        <Button arrow type="submit" onClick={handleForm}>
          Sign up
        </Button>
        <div className="absolute inset-0 -z-10 rounded-lg transition peer-focus:ring-4 peer-focus:ring-sky-300/15" />
        <div className="absolute inset-0 -z-10 rounded-lg bg-white/2.5 ring-1 ring-white/15 transition peer-focus:ring-sky-300" />
      </form>

      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-40"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">{message}</p>
                    <p className="mt-1 text-sm text-gray-500">{description}</p>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => {
                        setShow(false)
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  )
}
