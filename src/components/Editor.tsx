"use client"

import MaxWidthWrapper from '@/components/MaxwidthWrapper'
import WelcomeCard from '@/components/WelcomeCard'
import React from 'react'
import FroalaEditor from 'react-froala-wysiwyg'
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins/char_counter.min.js'

export default function Editor() {
  return (
    <div className='mt-12'>
          <FroalaEditor  tag='textarea' config={{
            placeholderText:"start writing your next book",
          }} />
    </div>
  )
}
