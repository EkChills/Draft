"use client"

import generatePDF from '@/lib/generatePdf'
import React, { useEffect } from 'react'

export default function SharedDocument({documentId, pageTitle, creator, html}:{documentId:string, pageTitle:string, creator:string | null; html:string}) {
    useEffect(() => {
        function handleExport () {
            const finalHtmlString = `  <h1 style="color: black; text-align: left; font-size:36px; font-weight:700; margin-bottom:10px; ">${pageTitle}</h1>`
            const storedHtml:string = finalHtmlString + localStorage.getItem(`savedHtml-${documentId}`)! + `<p style="margin-top:5px;">  </p>` 
            generatePDF(storedHtml)
          }
        handleExport()
    },[])
  return (
    <div className=''>
      <div className='flex flex-col items-center space-y-6 lg:space-y-8 mt-[88px]'>
        <h3 className='lg:text-2xl text-lg text-[#212124] font-bold'>{creator + ' '}just shared you a Document</h3>
        <p className='text-black/75 text-base '>Your document is downloading...</p>
      </div>
    </div>
  )
}
