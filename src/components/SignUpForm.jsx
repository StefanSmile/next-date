'use client'
import { useId } from 'react'
import { Button } from '@/components/Button'
import { useState } from "react";

import { doc, setDoc } from "firebase/firestore";
import { db } from "../config";

export function SignUpForm() {
  let id = useId()
  const [number, setNumber] = useState("");

  const handleInput = (e) => {
    const fieldValue = e.target.value;

    setNumber((prevState) => ({
      ...prevState,
      fieldValue
    }));

    console.log(number)
  }

  const handleForm = async () => {
    console.log(db)
    // Add a new document in collection "cities"
    await setDoc(doc(db, "numbers", "number"), {
      number: number,
    });
  }

  return (
    <form className="relative isolate mt-8 flex items-center pr-1">
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
  )
}
