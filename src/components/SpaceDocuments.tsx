import { getServerAuthSession } from '@/server/auth'
import { db } from '@/server/db'
import { document, memberships, space } from '@/server/db/schema'
import { eq } from 'drizzle-orm'
import React from 'react'
import DocumentCard from './DocumentCard'
import { redirect } from 'next/navigation'

export type joinedSpaces = {
  memberships: {
      userId: string | null;
      spaceId: string | null;
  } | null;
  document: {
      id: string;
      userId: string | null;
      spaceId: string | null;
      title: string | null;
      description: string | null;
      html: string | null;
      isStarred: boolean | null;
      documentStatus: "DELETED"
  }
}[]

export default async function SpaceDocuments({joinedSpaces}:{joinedSpaces: joinedSpaces}) {
  const session = await getServerAuthSession()
  
    console.log('joinedSpace', joinedSpaces);

  return (
    <div>
        <h4 className='w-full text-left text-xl font-bold antialiased mt-4 bg-gradient-to-r from-[#377FEB] to-[#00E0B9] bg-clip-text text-transparent'>Space Documents</h4>
        <div className='flex flex-col md:flex-row lg:flex-wrap gap-6 '>
        {joinedSpaces.map((space,idx) => {
          return <DocumentCard key={space.document.id} title={space.document.title!} id={space.document.id} html={space.document.html ?? ''} isStarred={space.document.isStarred!} href={`/all-documents/document/${space.document.id}`} description={space.document.description!} />
        })}
        </div>
    </div>
  )
}
