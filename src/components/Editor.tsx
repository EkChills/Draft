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
import dynamic from 'next/dynamic'

type EditorProps = {
  docId:string;
}


export default function Editor({docId}:EditorProps) {
  const [model, setModel] = useState(() => {
    return localStorage.getItem(`savedHtml`) ?? ""
  })
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
            documentReady: true,
            heightMin: 300,
            events:{
              "save.before": function(html:string) {
                localStorage.setItem("savedHtml",html)
              }
            }
          }}  />
    </div>
  )
}
