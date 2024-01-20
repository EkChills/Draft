import { api } from "@/trpc/react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { ChevronDown, FilePlus2, MoreHorizontal, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import LoadingDisplay from "./LoadingDisplay";
import QRCode from "react-qr-code";

export default function ShareDropdown() {
  const {
    mutate: addDocument,
    isSuccess,
    data,
    isLoading,
  } = api.document.addNewDocument.useMutation();
  const router = useRouter();
  if (isLoading) {
    return <LoadingDisplay loadingMessage="Creating document" />;
  }
  if (isSuccess) {
    router.push(`/all-documents/document/${data.documentId}`);
  }

  console.log(window.location.href);
  
  return (
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

      <DropdownMenu className="min-w-[328px] py-4"  aria-label="Profile Actions" variant="flat">
        <DropdownItem onClick={() => addDocument()}>
          <div className="flex items-center justify-between">
            <h6 className="font-bold text-base">Share as QR code</h6>
            <span className="p-2 rounded-full bg-[#ACAEAD]"><X className="w-4 h-4 font-bold text-white" /></span>
          </div>
          <hr className="mt-4" />
          <div className=" mt-4 p-4 shadow-lg rounded-xl bg-[rgb(250,250,250)]">
            <QRCode value={window.location.href}  href={window.location.href}   style={{ height: "auto", maxWidth: "100%", width: "100%" ,}}/>
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
