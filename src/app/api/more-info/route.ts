import { db } from "@/server/db";
import { user } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
  try {
    const body:{email:string} = await req.json() as {email:string}
    const dbUser = await db.query.user.findFirst({
      where:eq(user.email, body.email)
    })
    console.log('my db user info',dbUser);
    

    if(dbUser?.firstName) {
      return new NextResponse('not found', {status:404})
    }

    return NextResponse.json({firstName:dbUser?.firstName, lastName:dbUser?.lastName}) // assuming you want to return the first and

    
  } catch (error) {
    return new NextResponse('something went wrong', {status:500})
  }
}
