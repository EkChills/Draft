import Editor from "@/components/Editor";
import MaxWidthWrapper from "@/components/MaxwidthWrapper";
import SingleDocument from "@/components/SingleDocumnet";
import MainNavbar from "@/components/MainNavbar";
import { getServerAuthSession } from '@/server/auth';
import { db } from '@/server/db';
import { user } from '@/server/db/schema';
import { Navbar } from '@nextui-org/react';
import { eq } from 'drizzle-orm';

import WelcomeCard from "@/components/WelcomeCard";
import DocumentNav from "@/components/DocumentNav";

export default async function Document({params}:{params:{documentId:string}}) {
  const session = await getServerAuthSession()
  console.log(session);
  
  const dbUser = await db.select().from(user).where(eq(user.email, session!.user.email!))
  return (
    <>
                <DocumentNav firstName={dbUser[0]?.firstName ?? ''} lastName={dbUser[0]?.lastName ?? ''} />

        <MaxWidthWrapper className='border-l border-2 px-4 pt-4 overflow-x-scroll lg:px-24 lg:pt-12'>
          <SingleDocument documentId={params.documentId} />
          <Editor docId={params.documentId} />
        </MaxWidthWrapper>
    </>
  )
}
