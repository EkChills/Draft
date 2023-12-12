"use client"

import React from 'react'
import EmailAnimation from '@/lib/email-animation.json'
import Lottie from 'lottie-react'


export default function LottieDisplay() {
  return (
    <div>
   <Lottie size={5} className='w-72' animationData={EmailAnimation} loop={true} />;   
    </div>
  )
}
