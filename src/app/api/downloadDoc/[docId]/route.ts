import generatePDF from "@/lib/generatePdf";
import { db } from "@/server/db";
import { document } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest, {params}:{params:{docId:string}}) {
    try {
        const dbDocument = await db.query.document.findFirst({
            where:eq(document.id, params.docId)
        })
        if(dbDocument) {
            const generatedPdf = generatePDF(dbDocument.html!)
            const newHeaders = new Headers(req.headers)
            // Add a new header
            newHeaders.set('Content-Type', 'application/pdf')
            newHeaders.set('Content-Disposition', 'attachment; filename=document.pdf')
            // And produce a response with the new headers
            return NextResponse.next({
            request: {
                // New request headers
                headers: newHeaders,
            },
            })
            return NextResponse.json()
                    }
        return new NextResponse('document not found', {status:404})
    } catch (error) {
        
    }
}