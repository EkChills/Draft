import DocumentCard from "@/components/DocumentCard";
import Documents from "@/components/Documents";
import MainNavbar from "@/components/MainNavbar";
import MaxWidthWrapper from "@/components/MaxwidthWrapper";
import WelcomeCard from "@/components/WelcomeCard";
import { getServerAuthSession } from '@/server/auth';
import { db } from '@/server/db';
import { user } from '@/server/db/schema';
import { Navbar } from '@nextui-org/react';
import { eq } from 'drizzle-orm';

export default async function AllDocumentsPage() {
  const session = await getServerAuthSession()
  console.log(session);
  
  const dbUser = await db.select().from(user).where(eq(user.email, session!.user.email!))
  return (

    <>
            <MainNavbar firstName={dbUser[0]?.firstName ?? ''} userEmail={session!.user.email!} lastName={dbUser[0]?.lastName ?? ''} />

        <MaxWidthWrapper className='border-l border-2 px-4 pt-4 overflow-x-scroll lg:px-24 lg:pt-12'>
        <Documents />
        </MaxWidthWrapper>
    </>
  )
}
