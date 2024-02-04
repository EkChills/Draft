import { document } from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { redirect } from "next/navigation";
import { z } from "zod";
import { eq } from "drizzle-orm";

export const documentRouter = createTRPCRouter({
  addNewDocument:protectedProcedure.mutation(async({ctx}) => {
    const createdDocument = await ctx.db.insert(document).values({title:'untitled', userId:ctx.session.userId, documentStatus:"ACTIVE"}).returning({documentId:document.id})
    console.log('ran');
    console.log(createdDocument);
    
    
    // if(createdDocument) {
    //   redirect(`/all-documents/document/${createdDocument[0]?.documentId}`)
    // }
    return {
      success:true,
      documentId:createdDocument[0]?.documentId
    }
  }),
  updateDocument:protectedProcedure.input(z.object({
    documentId:z.string(),
    documentTitle:z.string(),
    description:z.string(),
    html:z.string(),
  })).mutation(async({ctx,input}) => {
    await ctx.db.update(document).set({
      title:input.documentTitle,
      description:input.description,
      html:input.html
    }).where(eq(document.id, input.documentId))

    return {
      success:true
    }
  }),
  getHtmlText:protectedProcedure.input(z.object({
    documentId:z.string()
  })).query(async({ctx, input}) => {
    const doc = await ctx.db.query.document.findFirst({
      where:eq(document.id, input.documentId)
    })
    return {
      success:true,
      htmlText:doc?.html
    }
  })
})