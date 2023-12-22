import { db } from '@/server/db'
import React from 'react'
import DocumentCard from './DocumentCard'
import WelcomeCard from './WelcomeCard'

export default async function Documents() {
    const allDocs = await db.query.document.findMany()
    if(allDocs.length <= 0) {
      return <WelcomeCard />
    }
  return (
    <div className='flex gap-6 flex-wrap'>
        {allDocs.map((doc,idx) => {
            return <DocumentCard title={doc.title!} key={doc.id} href={`all-documents/document/${doc.id}`} description={doc.description!} />
        })}
    </div>
  )
}
