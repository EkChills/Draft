import { db } from '@/server/db'
import { activateToken, user } from '@/server/db/schema'
import { and, eq, gt } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function Activate({params}:{params:{token:string}}) {
    const activatedToken = await db.select().from(activateToken).where(and(gt(activateToken.createdAt, new Date(Date.now() - 24*60*60*1000)), eq(activateToken.token, params.token)))
    console.log(activatedToken);
    
    const dbUser = await db.select().from(user).where(eq(user.id, activatedToken[0]!.userId!))

    if(!dbUser) {
      throw new Error('invalid token')
    }

    const updatedUser = await db.update(user).set({active:true}).where(eq(user.id,dbUser[0]!.id!))
    const updatedToken = await db.update(activateToken).set({activatedAt:new Date()}).where(eq(activateToken.token, params.token))
    if(updatedToken) {
      redirect('/signin')
    }     

  return (
    <div>page</div>
  )
}

