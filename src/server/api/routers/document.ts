import { document } from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { redirect } from "next/navigation";

export const documentRouter = createTRPCRouter({
  addNewDocument:protectedProcedure.mutation(async({ctx}) => {
    const createdDocument = await ctx.db.insert(document).values({title:'untitled', userId:ctx.session.userId}).returning({documentId:document.id})
    console.log('ran');
    console.log(createdDocument);
    
    
    // if(createdDocument) {
    //   redirect(`/all-documents/document/${createdDocument[0]?.documentId}`)
    // }
    return {
      success:true,
      documentId:createdDocument[0]?.documentId
    }
  })
})