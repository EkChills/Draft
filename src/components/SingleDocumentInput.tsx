"use client"

import { useDocumentContext } from '@/lib/context/DocumentContext'
import { api } from '@/trpc/react'
import { Input } from '@nextui-org/react'
import React, { useEffect } from 'react'
import {useDebounce, useLocalStorage} from 'usehooks-ts'
// import {useI} from 'react'

export default function SingleDocumentInput({documentId}:{documentId:string}) {
  const [pageName, setPageName] = useLocalStorage(`document-${documentId}`, '')
  const debounceValue = useDebounce<string>(pageName, 500)
  const {setPageTitle, pageTitle} = useDocumentContext()
  const {mutate, isLoading, isSuccess} = api.document.updateDocument.useMutation()


  useEffect(() => {
    if(pageName.length >= 0) {
       setPageTitle(pageName)
    }
  },[pageName])

  
  // const debounceValue = useDebounce(pageTitle, 400)
  return (
    <div>
      <input className='outline-none bg-transparent placeholder:text-[#D7D7D7] text-4xl font-bold' defaultValue={'hell'} value={pageName.length > 0 ? pageName : pageTitle} onChange={(e) => setPageName(e.target.value)} placeholder='Page Title' />
    </div>
  )
}
