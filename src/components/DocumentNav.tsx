"use client";

import React, { useRef } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { BookText, ChevronDown, FileText, Forward, Image, MoreHorizontal, PanelLeft, Plus } from "lucide-react";
import BigNavDropdown from "./BigNavDropdown";
import AddNoteDropdown from "./AddNoteDropdown";
import { usePathname } from "next/navigation";
import { useDocumentContext } from "@/lib/context/DocumentContext";
import generatePDF from "@/lib/generatePdf";
// import {AcmeLogo} from "./AcmeLogo.jsx";

export default function DocumentNav({firstName, lastName, documentId}:{firstName:string; lastName:string; documentId:string;}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const elRef = useRef<HTMLElement>(null)
  const {pageTitle} = useDocumentContext()


  
  async function handleSave () {
    const finalHtmlString = `  <h1 style="color: black; text-align: left; font-size:36px; font-weight:700; margin-bottom:10px; ">${pageTitle}</h1>`
    const storedHtml:string = finalHtmlString + localStorage.getItem(`savedHtml-${pageTitle}`)! + `<p style="margin-top:5px;">  </p>` 
    generatePDF(storedHtml)

  }

  console.log(localStorage.getItem('savedHtml'));
  
  return (
    <Navbar className="" maxWidth="full" isBordered>
    
      {/* <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent> */}
      <NavbarContent as="div" justify="start">
        <BigNavDropdown firstName={firstName} lastName={lastName} />
        <div className="flex w-full items-center justify-between px-4">
        <NavbarMenuToggle className="lg:hidden" aria-label={isMenuOpen ? "Close menu" : "Open menu"} />

          <div className="flex items-center gap-8">
            <PanelLeft className="text-[#212121] hidden lg:block" />
            {<span className="text-base font-bold">{pageTitle.trim().length > 1 ? pageTitle : "Untitled Document"}</span>}
          </div>
          <div className="flex items-center">
            <Dropdown backdrop="blur">
              <DropdownTrigger>
                <Button variant="solid" className="bg-[#367EE7] text-white font-bold mr-2">
                  <span ref={elRef}>Export as</span>
                  <Forward />
                </Button>
              </DropdownTrigger>
              <DropdownMenu variant="faded" className="font-bold" aria-label="Static Actions">
        <DropdownItem key="new" onClick={handleSave}  endContent={<FileText className="font-bold text-sm text-[#262828]" />}>PDF</DropdownItem>
        <DropdownItem key="copy" endContent={<Image className="font-bold text-sm text-[#262828]" />}>Image</DropdownItem>
        <DropdownItem key="edit" endContent={<BookText className="font-bold text-sm text-[#262828]" />}>MarkDown</DropdownItem>

      </DropdownMenu>
            </Dropdown>
            <AddNoteDropdown />
            <Button isIconOnly variant="ghost" className="ml-4 hidden sm:block" aria-label="more">
              <MoreHorizontal />
              </Button>
          </div>
        </div>
      </NavbarContent>
    </Navbar>
  );
}

