"use client"

import React from 'react'
import { FileText, type LucideIcon, Star } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@nextui-org/system';
import Link from 'next/link';
import { type Url } from 'url';

const AllLinksArray:{icon:LucideIcon; text:string; path:Url | string; }[]= [
   {
    icon:FileText,
    text:"All Documents",
    path:"/all-documents"
   },
   {
    icon:Star,
    text:"Starred",
    path:"/all-documents/starred"
   }
]

export default function AllLinks() {
  const pathName = usePathname()
  const router = useRouter()
  const handleLinkPush = (path:string) => {
    router.push(path)
    router.refresh()
  }
  return (
    <div className='flex flex-col '>
        {
            AllLinksArray.map((item, index) => {
                return <div onClick={() => handleLinkPush(item.path as string)} key={index} className={cn('flex items-center cursor-pointer p-4 rounded-lg gap-4', pathName === item.path ? 'bg-[#F2F2F2]' : '')}>
                    <item.icon />
                    <span className='text-base font-semibold'>{item.text}</span>
                </div>
            }) 
        }
    </div>
  )
}
