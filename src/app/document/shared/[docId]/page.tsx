import { db } from '@/server/db'
import React from 'react'
import { document, user } from "@/server/db/schema";
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation'
import generatePDF from '@/lib/generatePdf';
import MaxWidthWrapper from '@/components/MaxwidthWrapper';
import SharedDocument from '@/components/SharedDocument';


export default async function page({params}:{params:{docId:string}}) {
  const dbDocument = await db.query.document.findFirst({
    where:eq(document.id, params.docId)
})
if (!dbDocument) notFound()

const documentCreator = await db.query.user.findFirst({
  where:eq(user.id, dbDocument.userId!)
}) 
  return (
    <main>
      <SharedDocument html={dbDocument.html!} documentId={dbDocument.id} pageTitle={dbDocument.title!} creator={documentCreator!.firstName! + ' ' + documentCreator?.lastName} />
    </main>
  )
}
