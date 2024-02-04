"use server"

import { db } from "@/server/db";
import { document } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteDocumentAction({docId}:{docId:string}) {
  try {
    const deletedDocument = await db.update(document).set({
      documentStatus:"DELETED"
    }).where(eq(document.id, docId))
    revalidatePath('/')
    return {
      status:"success"
    }
  } catch (error) {
    console.log(error);
    return {
      status:"error"
    }
  }
}