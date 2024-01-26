"use client"

import React, { useEffect, useState } from "react";
import { Card, CardBody } from "@nextui-org/react";
import Link from "next/link";

type DocumentCardProps = {
  title: string;
  description?:string;
  href: string;
  html:string;
};

const DocumentCard = ({title, description, href, html}:DocumentCardProps) => {
  const [isMounted, setisMounted] = useState<boolean>(false)

  useEffect(() => {
    setisMounted(true)
  },[])
  return (
    <Card className="md:max-w-[400px]  w-full md:min-w-[400px] max-h-[280px] ">
      <CardBody className="flex flex-col  gap-8">
        <h3 className="text-lg font-bold tracking-tight">{title}</h3>
        { isMounted && <div className="overflow-y-scroll scrollbar-hide" dangerouslySetInnerHTML={{__html:html}} />}
        <div className="flex items-center justify-end ">
          <button className="focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground inline-flex h-10 items-center justify-center rounded-md border border-blue-500 bg-background px-4 py-2 text-sm font-medium text-blue-500 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            <Link href={href}>
            View Full Document
            </Link>
          </button>
        </div>
      </CardBody>
    </Card>
  );
};

export default DocumentCard;

// export default function DocumentCard() {
//   return (
//     <div className="flex flex-wrap justify-around">
//   <div
//     className="rounded-lg bg-card text-card-foreground shadow-md border border-gray-200 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 m-4"
//     data-v0-t="card"
//   >
//     <div className="flex flex-col space-y-1.5 p-6">
//       <h3 className="tracking-tight text-lg font-bold">Document Title</h3>
//     </div>
//     <div className="p-6">
//       <p className="text-sm text-gray-500">
//         This is a short preview of the document. Click the button below to view the full document.
//       </p>
//     </div>
//     <div className="items-center p-6 flex justify-end">
//       <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-blue-500 border-blue-500">
//         View Full Document
//       </button>
//     </div>
//   </div>
// </div>
//   )
// }
