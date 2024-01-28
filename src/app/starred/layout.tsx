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

 
  return (
    <main>
      <DocumentContextProvider>

        <BigSidebar />
        {children}
      </DocumentContextProvider>
      </main>
  )
}
