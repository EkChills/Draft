"use server"


import { db } from "@/server/db";
import { document } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function starDocumentAction({documentId}:{documentId:string}) {
  try {
    const dbDocument = await db.query.document.findFirst({
      where:eq(document.id, documentId)
    })
    const starredDoc = await db.update(document).set({
      ...dbDocument,
      isStarred:!dbDocument?.isStarred
    }).where(eq(document.id, documentId))
    revalidatePath('/')
    if(starredDoc) {
      return {success:true}
    }
    
  } catch (error) {
    console.log(error);
    
  }

}