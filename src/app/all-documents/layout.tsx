import BigSidebar from '@/components/BigSidebar';
import MainNavbar from '@/components/MainNavbar';
import { DocumentContextProvider } from '@/lib/context/DocumentContext';
import { getServerAuthSession } from '@/server/auth';
import { db } from '@/server/db';
import { user } from '@/server/db/schema';
import { Navbar } from '@nextui-org/react';
import { eq } from 'drizzle-orm';
import React from 'react'

export default async function layout({
    children,
  }: {
    children: React.ReactNode;
  }) {

    const session = await getServerAuthSession()
    console.log(session);
    
    const dbUser = await db.select().from(user).where(eq(user.email, session!.user.email!))
  return (
    <main>
      <DocumentContextProvider>

        <MainNavbar firstName={dbUser[0]?.firstName ?? ''} lastName={dbUser[0]?.lastName ?? ''} />
        <BigSidebar />
        {children}
      </DocumentContextProvider>
      </main>
  )
}
