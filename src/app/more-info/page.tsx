import MoreInfoForm from "@/components/MoreinfoForm";
import { authOptions, getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { user } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const session = await getServerSession(authOptions)
  console.log(session);
  
  const dbUser = await db.query.user.findFirst({
    where:eq(user.email, session!.user.email!)
  })
  // if(dbUser?.firstName) {
  //   redirect('/all-documents')
  // }
  return (
    <div className="flex flex-col">
      <h3 className="mx-auto mt-24 text-3xl font-bold">Enter your name</h3>
      <p className="mx-auto mt-4 text-base font-medium text-[#787878]">
        Displayed when sharing content
      </p>
      <MoreInfoForm session={session!} />
    </div>
  );
}
