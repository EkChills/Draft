import { Loader2 } from 'lucide-react';
import React from 'react'

type LoadingDisplayProps = {
    loadingMessage?:string;
}
export default function LoadingDisplay({loadingMessage = "Loading"}:LoadingDisplayProps) {
  return (
    <div className='fixed inset-0 top-0 bottom-0 min-h-screen grid place-items-center z-50 '>
        <div className='w-[260px] h-[136px] rounded-lg bg-white shadow-md px-4 pt-8 pb-4 flex flex-col items-center opacity-90'>
            <Loader2 className='w-6 h-6 animate-spin' />
            <p className='text-xl font-semibold text-black/75 mt-6 capitalize'>{loadingMessage}</p>
        </div>
    </div>
  )
}
