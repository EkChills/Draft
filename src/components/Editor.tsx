"use client"

import MaxWidthWrapper from '@/components/MaxwidthWrapper'
import WelcomeCard from '@/components/WelcomeCard'
import React, { useState } from 'react'
import FroalaEditor from 'react-froala-wysiwyg'
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins/char_counter.min.js'
import "froala-editor/js/plugins/save.min.js"
import "froala-editor/js/plugins/font_size.min.js"
import {Button, } from '@nextui-org/react'
import { useDocumentContext } from '@/lib/context/DocumentContext'
import { api } from '@/trpc/react'
import { toast } from 'react-toastify'
import { BadgeCheck } from 'lucide-react'
type EditorProps = {
  docId:string;
}


export default function Editor({docId}:EditorProps) {
  const [model, setModel] = useState(() => {
    return localStorage.getItem(`savedHtml/${docId}`) ?? ""
  })
  const {pageTitle} = useDocumentContext()
  const {mutate, isLoading, isSuccess} = api.document.updateDocument.useMutation()

  function handleSave () {
    const parser = new DOMParser()
    const doc = parser.parseFromString(model, 'text/html');
    const textContent = doc.body.textContent;
    mutate({documentId:docId, documentTitle:pageTitle, description:textContent!.substring(0, 200)})
    console.log(textContent?.substring(0,200));
    toast.success("Changes Saved", {
      position:"bottom-right",
      hideProgressBar:true,
      icon:<BadgeCheck className='h-4 w-4' />
    })
    // mutate
  }

  return (
    <div id='editor' className='mt-12'>
          <FroalaEditor  tag='textarea' model={model}
          onModelChange={(e:string) => {
              setModel(e)
          }}  
           config={{
            saveInterval:2000,
            placeholderText:"start writing your document...",
            fontSizeSelection:true,
            // documentReady: true,
            heightMin: 300,
            events:{
              "save.before": function(html:string) {
                localStorage.setItem(`savedHtml/${docId}`,html)
              }
            }
          }}  />
          <div className='flex mt-4 justify-end'>
            <Button variant="solid" onClick={handleSave} isLoading={isLoading} color='secondary'>
              Save
            </Button>
          </div>
    </div>
  )
}