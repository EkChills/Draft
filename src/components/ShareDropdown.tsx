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
import { ChevronDown, FilePlus2, MoreHorizontal, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import LoadingDisplay from "./LoadingDisplay";
import QRCode from "react-qr-code";
import { BaseUrl, baseUrlClient } from "@/lib/utils";

export default function ShareDropdown({docId}:{docId:string}) {

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
        <DropdownItem>
          <div className="flex items-center justify-between">
            <h6 className="font-bold text-base">Share as QR code</h6>
            <span className="p-2 rounded-full bg-[#ACAEAD]"><X className="w-4 h-4 font-bold text-white" /></span>
          </div>
          <hr className="mt-4" />
          <Card className=" mt-4 shadow-lg rounded-xl bg-[rgb(250,250,250)]">
            <CardBody className="p-2 bg-white/75">
            <QRCode value={`${baseUrlClient}/document/shared/${docId}`}  href={window.location.href}   style={{ height: "auto", maxWidth: "100%", width: "100%" ,}}/>
            </CardBody>
          </Card>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
