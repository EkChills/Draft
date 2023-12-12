"use client"

import { Input } from '@nextui-org/react'
import React from 'react'
import {useDebounce, useLocalStorage} from 'usehooks-ts'

export default function SingleDocument({documentId}:{documentId:string}) {
  const [pageTitle, setPageTitle] = useLocalStorage(`document/${documentId}`, '')
  // const debounceValue = useDebounce(pageTitle, 400)
  return (
    <div>
      <input className='outline-none bg-transparent placeholder:text-[#D7D7D7] text-4xl font-bold' value={pageTitle} onChange={(e) => setPageTitle(e.target.value)} placeholder='Page Title' />
    </div>
  )
}
