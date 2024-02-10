import React from 'react'

interface MemberNameDisplayProps {
    fullName:string;
    email:string;
}
export default function MemberNameDisplay({email, fullName}:MemberNameDisplayProps) {
  return (
    <div className='w-full flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
            <span className='rounded-full text-base font-bold text-white/80 bg-blue-600 w-8 h-8  relative'><span className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>{fullName[0]}</span></span>
            <div className='flex flex-col gap-0'>
                <p className='text-md font-semibold'>{fullName}</p>
                <p className='text-base text-black/60'>{email}</p>
            </div>
        </div>
    </div>
  )
}
