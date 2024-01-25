"use server"

import { db } from "@/server/db";
import { document } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";



export async function saveDocAction ({documentDescription,documentId,documentTitle,html}:{documentId:string; documentTitle:string; documentDescription:string; html:string;}) {
  try {
    const updatedDoc = await db.update(document).set({
      title:documentTitle,
      description:documentDescription,
      html:html
    }).where(eq(document.id, documentId))
    revalidatePath('/')
    if(updatedDoc) return {success:true}

  } catch (error) {
    console.log(error);
    return {
      success:false
    }
  }
}