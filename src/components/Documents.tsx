import { db } from '@/server/db'
import React from 'react'
import DocumentCard from './DocumentCard'
import WelcomeCard from './WelcomeCard'
import { getServerAuthSession } from '@/server/auth'
import { eq } from 'drizzle-orm'
import { document } from '@/server/db/schema'
import {cache} from 'react'

export const revalidate = 3600 // revalidate the data at most every hour
export default async function Documents() {
  const session = await getServerAuthSession()
    const allDocs = await db.query.document.findMany({
      where:eq(document.userId, session!.userId)
    })
    if(allDocs.length <= 0) {
      return <WelcomeCard />
    }
  return (
    <div className='flex flex-col md:flex-row lg:flex-wrap gap-6 '>
        {allDocs.map((doc,idx) => {
            return <DocumentCard title={doc.title!} id={doc.id} key={doc.id} html={doc.html ?? ''} isStarred={doc.isStarred!} href={`all-documents/document/${doc.id}`} description={doc.description!} />
        })}
     </div>
  )
}
