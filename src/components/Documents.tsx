import { db } from '@/server/db'
import React, { Suspense } from 'react'
import DocumentCard from './DocumentCard'
import WelcomeCard from './WelcomeCard'
import { getServerAuthSession } from '@/server/auth'
import { and, eq } from 'drizzle-orm'
import { document, memberships, space } from '@/server/db/schema'
import {cache} from 'react'
import SpaceDocuments, { joinedSpaces } from './SpaceDocuments'
import SpaceDocsLoading from './SpaceDocsLoading'

export const revalidate = 3600 // revalidate the data at most every hour
export default async function Documents() {
  const session = await getServerAuthSession()
    const allDocs = await db.query.document.findMany({
      where:and(eq(document.userId, session!.userId), eq(document.documentStatus, "ACTIVE"))
    })
    console.log(allDocs);
    const joinedSpaces = await db.select().from(document).leftJoin(memberships, eq(document.spaceId, memberships.spaceId)).where(eq(memberships.userId, session!.userId))

    
    if(allDocs.length <= 0 && joinedSpaces.length <= 0) {
      return <WelcomeCard />
    }
  return (
    <>
    <div className='flex flex-col md:flex-row lg:flex-wrap gap-6 '>
        {allDocs.map((doc,idx) => {
            return <DocumentCard title={doc.title!} id={doc.id} key={doc.id} html={doc.html ?? ''} isStarred={doc.isStarred!} href={`all-documents/document/${doc.id}`} description={doc.description!} />
        })}

     </div>
     <Suspense fallback={<SpaceDocsLoading />}>
          <SpaceDocuments joinedSpaces={joinedSpaces as joinedSpaces} />
      </Suspense>
     </>
  )
}


