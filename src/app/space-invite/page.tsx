import { getServerAuthSession } from '@/server/auth'
import { db } from '@/server/db'
import { memberships } from '@/server/db/schema'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function page({searchParams}:{searchParams:{id:string}}) {
    const session = await getServerAuthSession()
    if(!session) redirect('/all-documents')
    if(session) {
        await db.insert(memberships).values({spaceId:searchParams.id, userId:session.userId})
        redirect('/all-documents')
    }
  return (
    <div>page</div>
  )
}
