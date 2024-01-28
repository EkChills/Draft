import MainNavbar from '@/components/MainNavbar'
import MaxWidthWrapper from '@/components/MaxwidthWrapper'
import { getServerAuthSession } from '@/server/auth';
import { db } from '@/server/db';
import { user } from '@/server/db/schema';
import { eq } from 'drizzle-orm';
import React from 'react'

export default async function StarredPage() {
  const session = await getServerAuthSession()
  console.log(session);
  
  const dbUser = await db.select().from(user).where(eq(user.email, session!.user.email!))
  return (
    <>
      <MainNavbar firstName={dbUser[0]?.firstName ?? ''} userEmail={session!.user.email!} lastName={dbUser[0]?.lastName ?? ''} />
    <MaxWidthWrapper className='border-l border-2 px-4 pt-4 overflow-x-scroll lg:px-24 lg:pt-12' >
      <main className='min-h-screen w-full flex'>
        <h6 className='text-black/75 text-lg mt-[192px] mx-auto'>Star documents you want to easily find later</h6>
      </main>
    </MaxWidthWrapper>
    </>
  )
}
