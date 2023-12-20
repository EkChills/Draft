"use client"

import { useDocumentContext } from '@/lib/context/DocumentContext'
import { Input } from '@nextui-org/react'
import React, { useEffect } from 'react'
import {useDebounce, useLocalStorage} from 'usehooks-ts'

export default function SingleDocument({documentId}:{documentId:string}) {
  const [pageName, setPageName] = useLocalStorage(`document/${documentId}`, '')
  const {setPageTitle} = useDocumentContext()
  useEffect(() => {
    setPageTitle(pageName)
  },[pageName])
  // const debounceValue = useDebounce(pageTitle, 400)
  return (
    <div>
      <input className='outline-none bg-transparent placeholder:text-[#D7D7D7] text-4xl font-bold' value={pageName} onChange={(e) => setPageName(e.target.value)} placeholder='Page Title' />
    </div>
  )
}
