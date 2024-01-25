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
import { useState } from 'react'
import FroalaEditor from 'react-froala-wysiwyg'
import PaymentModalAlert from './PaymentModalAlert'
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

  return (
    <>
    <form id='editor' action={saveDocWithProperties} className='mt-12'>
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
            charCounterMax: awaitedSub.data.subscriptions.length > 0 ? awaitedSub?.data?.subscriptions[0]!.status === 'active' ? 1000 : 50 : 50,

            events:{
              "save.before": function(html:string) {
                localStorage.setItem(`savedHtml-${docId}`,html)
              },
              'charCounter.exceeded': function () {
                // Do something here.
                // this is the editor instance.
                setShowPaymentModal(true)
              }
            }
          }}  />
         <SaveDocButton />
    </form>
    <PaymentModalAlert isOpenPayment={showpaymentModal} setIsOpenPayment={setShowPaymentModal} />
    </>
  )
}
