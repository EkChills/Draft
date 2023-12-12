

import React from 'react'
import Lottie from "lottie-react";
import EmailAnimation from '@/lib/email-animation.json'
import LottieDisplay from '@/components/LottieDisplay';
import { Card } from '@nextui-org/react';

export default function page() {
  return (
    <div className='w-full flex justify-center pt-24'>
      <Card className='flex justify-center items-center p-12'>

      <LottieDisplay />
      <h3 className='text-2xl text-center font-bold mb-2 '>Check your mailbox!</h3>
      <div>
        <p className='text-center text-lg text-gray-400'>We sent you a link to verify your email <br /> check your spam folder if you cant see it in your inbox</p>

      </div>
      </Card>
    </div>
  )
}
