"use client"

import SaveDocButton from '@/components/serverButtons/saveDocButton'
import { saveDocAction } from '@/lib/actions/saveEditAction'
import { useDocumentContext } from '@/lib/context/DocumentContext'
import { api } from '@/trpc/react'
import 'froala-editor/css/froala_editor.pkgd.min.css'
import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/js/plugins.pkgd.min.js'
import 'froala-editor/js/plugins/char_counter.min.js'
import "froala-editor/js/plugins/font_size.min.js"
import "froala-editor/js/plugins/save.min.js"
import React, { useState } from 'react'
import FroalaEditor from 'react-froala-wysiwyg'
import PaymentModalAlert from './PaymentModalAlert'
import { RoomProvider, useMyPresence } from 'liveblocks.config'
import { ClientSideSuspense } from '@liveblocks/react'
import EditorRoom from './EditorRoom'
import { LiveObject } from '@liveblocks/client'
type EditorProps = {
  docId:string;
  awaitedSub:{status:boolean; data:{
    subscriptions:Array<{status:string}>
  } },
  htmlString:string | null;
  documentTitle:string | null
}


export default function Editor({docId, awaitedSub, htmlString, documentTitle}:EditorProps) {  
  const {pageTitle, setPageTitle} = useDocumentContext()
  const {data:htmlText} = api.document.getHtmlText.useQuery({documentId:docId})
  const [showpaymentModal, setShowPaymentModal] = useState<boolean>(false)
  console.log('htmlText', htmlText);
  
  const [model, setModel] = useState(() => {
    console.log(docId),'docd';
    const saVedHtmlString = localStorage.getItem(`savedHtml-${docId}`)
    console.log('savvd', saVedHtmlString);

    if(htmlString){
      return htmlString
    }
    
    if(saVedHtmlString !== '' || !null) {
      return localStorage.getItem(`savedHtml-${docId}`)
      
    }
    return htmlText?.success ? htmlText.htmlText : 'err'
  })

  
  // const {mutate, isLoading,data} = api.document.updateDocument.useMutation()
  const parser = new DOMParser()
  const doc = parser.parseFromString(model!, 'text/html');
  const textContent = doc.body.textContent?.replaceAll('Powered by Froala Editor','');

  // async function handleSave () {
  //   if(model) {
  //     const parser = new DOMParser()
  //     const doc = parser.parseFromString(model, 'text/html');
  //     const textContent = doc.body.textContent?.replaceAll('Powered by Froala Editor','');
  //     localStorage.setItem(`savedHtml-${docId}`,model)
  //     mutate({documentId:docId, documentTitle:pageTitle, description:textContent!.substring(0, 200),html:model})
  //     revalidatePath('/', 'layout')
  //   }
  //   // mutate by damned
  // // }

  // useEffect(() => {
  //   if(data?.success) {
  //     toast.success("Changes Saved", {
  //       position:"bottom-right",
  //       hideProgressBar:true,
  //       icon:<BadgeCheck className='h-4 w-4' />
  //     })
  //   }  
  // },[data?.success])

  const saveDocWithProperties = saveDocAction.bind(null, {documentId:docId, documentTitle:pageTitle, documentDescription:textContent!.substring(0, 200),html:model!})
  // Update cursor coordinates on pointer move

  return (
    <RoomProvider initialPresence={{cursor:null, isTyping:null}}  initialStorage={{author: new LiveObject({ documentText: ""})}} id={docId}>
      <ClientSideSuspense fallback={<div>Loading...</div>}>
        {() => <EditorRoom docId={docId} htmlString={htmlString} awaitedSub={awaitedSub} pageTitle={pageTitle}  />
        }
      </ClientSideSuspense>
    
    </RoomProvider>
  )
}
