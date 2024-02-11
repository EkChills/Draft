import { cn } from '@nextui-org/system';
import React from 'react'
import TabsDisplay from './TabsDisplay';
import { getServerAuthSession } from '@/server/auth';
import { db } from '@/server/db';
import { eq } from 'drizzle-orm';
import {  space, user } from '@/server/db/schema';

export default async function BigSidebar({className}:{className?:string;}) {
  const session = await getServerAuthSession()
  const dbUser = await db.query.space.findFirst({
    where:eq(space.hostId, session!.userId)
  })
  return (
    <div className={cn('fixed z-50 top-[4rem] left-0 w-[340px] px-2 bottom-0 hidden lg:flex ', className)}>
        <TabsDisplay fullName={dbUser?.spaceName ?? ''} spaceId={dbUser?.id ?? ''} />
    </div>
  )
}
