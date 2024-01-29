import { db } from "@/server/db";
import React from "react";
import DocumentCard from "./DocumentCard";
import WelcomeCard from "./WelcomeCard";
import { getServerAuthSession } from "@/server/auth";
import { and, eq } from "drizzle-orm";
import { document } from "@/server/db/schema";
import { cache } from "react";

export const revalidate = 3600; // revalidate the data at most every hour
export default async function StarredDocuments() {
  const session = await getServerAuthSession();
  const allDocs = await db.select().from(document).where(and(eq(document.userId, session!.userId), eq(document.isStarred, true)))
  if (allDocs.length <= 0) {
    return (
      <main className="flex min-h-screen w-full">
        <h6 className="mx-auto mt-[192px] text-lg text-black/75">
          Star documents you want to easily find later
        </h6>
      </main>
    );
  }
  return (
    <div className="flex flex-col gap-6 md:flex-row lg:flex-wrap ">
      {allDocs.map((doc, idx) => {
        return (
          <DocumentCard
            title={doc.title!}
            id={doc.id}
            key={doc.id}
            html={doc.html ?? ""}
            isStarred={doc.isStarred!}
            href={`/all-documents/document/${doc.id}`}
            description={doc.description!}
          />
        );
      })}
    </div>
  );
}
