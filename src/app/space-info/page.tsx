import MoreInfoForm from "@/components/MoreinfoForm";
import SpaceInfoForm from "@/components/SpaceInfoForm";
import { authOptions, getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { space, user } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const session = await getServerSession(authOptions)
  console.log(session);
  
  const dbUser = await db.query.space.findFirst({
    where:eq(space.hostId, session!.userId)
  })
  if(dbUser) {
    redirect('/all-documents')
  }
  return (
    <div className="flex flex-col">
      <h3 className="mx-auto mt-24 text-3xl font-bold">Space Name</h3>
      <p className="mx-auto mt-4 text-base font-medium text-[#787878]">
        Displayed when sharing content
      </p>
      <SpaceInfoForm />
    </div>
  );
}
