import React from 'react'

import { Image } from '@nextui-org/react'

import SignInForm from '@/components/SignInForm' 

export default function SignIn() {

  return (
    <main className="flex flex-col justify-center h-screen p-4">

      <div className="mx-auto text-center">
      
    

        <h1 className="text-5xl font-bold mb-3">draft</h1>

        <p className="text-gray-500 mb-10 text-lg">
          Please confirm your email to continue
        </p>

      </div>

      <SignInForm />

    </main>
  )

}