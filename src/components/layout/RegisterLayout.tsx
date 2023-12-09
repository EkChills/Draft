import React from 'react'
import { Image } from '@nextui-org/react'
import RegisterForm from '../RegisterForm'
import { randomUUID } from 'crypto';

export default function RegisterLayout() {
  console.log((randomUUID()+randomUUID()).replaceAll('-',''));
  
  return (
    <div className='flex w-full min-h-screen  p-4'>
        <div className='h-full lg:w-[60%] w-full flex flex-col'>
            <span className='flex items-center gap-0 mt-12 lg:mt-16 mx-auto'>
                <Image src='/images/logo.jpg' className='w-14 h-14 '  />
                <p className="text-3xl font-bold">draft</p>
            </span>

            <h3 className='text-3xl font-bold mt-24 mx-auto'>Let's get started!</h3>
            <p className='mt-4 text-base text-[#787878] font-medium mx-auto'>Please confirm your email to continue</p>
            <RegisterForm />
        </div>
        <div className='hidden lg:block min-h-full lg:w-[40%] bg-[#F7F7F7] bg-[url(/images/auth.jpg)] bg-left bg-cover'></div>
    </div>
  )
}
