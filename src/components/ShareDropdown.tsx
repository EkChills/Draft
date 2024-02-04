import { api } from "@/trpc/react";
import {
  Button,
  Card,
  CardBody,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { ChevronDown, FilePlus2, MoreHorizontal, Plus, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import LoadingDisplay from "./LoadingDisplay";
import QRCode from "react-qr-code";
import { BaseUrl, baseUrlClient } from "@/lib/utils";
import DeleteDocModal from "./DeleteDocModal";
import { doc } from "prettier";

export default function ShareDropdown({docId, docTitle}:{docId:string; docTitle:string;}) {
  const [isOpenPayment, setIsOpenPayment] = useState<boolean>(false);
  return (
    <>
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button
          isIconOnly
          variant="ghost"
          className="ml-4"
          aria-label="more"
        >
          <MoreHorizontal />
        </Button>
      </DropdownTrigger>

      <DropdownMenu className="min-w-[328px] "  aria-label="Profile Actions" variant="flat">
        <DropdownItem>
          <div className="flex items-center justify-between">
            <h6 className="font-bold text-base">Share as QR code</h6>
            <span className="p-2 rounded-full bg-[#ACAEAD]"><X className="w-4 h-4 font-bold text-white" /></span>
          </div>
          <hr className="mt-2" />
          <Card className=" mt-2 shadow-lg rounded-xl bg-[rgb(250,250,250)]">
            <CardBody className="p-2 bg-white/75">
            <QRCode value={`${baseUrlClient}/document/shared/${docId}`}  href={window.location.href}   style={{ height: "auto", maxWidth: "100%", width: "100%" ,}}/>
            </CardBody>
          </Card>
        </DropdownItem>
        <DropdownItem className="bg-red-400/25 py-4 " onClick={() => setIsOpenPayment(true)}>
          <div className="flex items-center justify-between w-full">
          <span className="text-red-500 font-semibold text-base">Delete Document</span>
          <Trash2 className="text-red-500 w-6 h-6" />

          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <DeleteDocModal isOpenPayment={isOpenPayment} setIsOpenPayment={setIsOpenPayment} docId={docId} docTitle={docTitle} />
    </>
  );
}
