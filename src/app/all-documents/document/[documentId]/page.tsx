import Editor from "@/components/Editor";
import MaxWidthWrapper from "@/components/MaxwidthWrapper";
import SingleDocument from "@/components/SingleDocumentInput";
import MainNavbar from "@/components/MainNavbar";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { customerCode, document, user } from "@/server/db/schema";
import { Navbar } from "@nextui-org/react";
import { eq } from "drizzle-orm";

import WelcomeCard from "@/components/WelcomeCard";
import DocumentNav from "@/components/DocumentNav";
import { env } from "@/env";

export async function generateStaticParams() {
  const documents = await db.query.document.findMany()
 
  return documents.map((doc) => ({
    documentId:doc.id,
  }))
}
export default async function Document({
  params,
}: {
  params: { documentId: string };
}) {
  const session = await getServerAuthSession();
  console.log(session,'this session');

  const dbUser = await db
    .select()
    .from(user)
    .where(eq(user.email, session!.user.email!));
  const singleDocument = await db.query.document.findFirst({
    where: eq(document.id, params.documentId),
  });

  const customer = await db.select().from(customerCode).where(eq(customerCode.userId, session!.userId))

  const subscription = await fetch(`https://api.paystack.co/customer/${customer[0]?.customerCode}`, {
    method:"GET",
    headers:{
      authorization:`Bearer ${env.PAYSTACK_SECRET_KEY}`
    }
  })

  
  const awaitedSub = await subscription.json() as {status:boolean; data:{
    subscriptions:Array<{status:string}>
  } }
  console.log('awaitedsub', awaitedSub.data.subscriptions, customer[0]?.customerCode);
  
  

  if (!singleDocument) {
    throw new Error("no such document");
  }
  return (
    <>
      <DocumentNav
        firstName={dbUser[0]?.firstName ?? ""}
        lastName={dbUser[0]?.lastName ?? ""}
        documentId={params.documentId}
        userEmail={session?.user.email ?? ''}
      />

      <MaxWidthWrapper className="overflow-x-scroll border-2 border-l px-4 pt-4 lg:px-24 lg:pt-12">
        <SingleDocument documentId={params.documentId} />
        <Editor awaitedSub={awaitedSub} docId={params.documentId} />
      </MaxWidthWrapper>
    </>
  );
}
