"use client";

import { useDocumentContext } from "@/lib/context/DocumentContext";
import generatePDF from "@/lib/generatePdf";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarContent,
  NavbarMenuToggle
} from "@nextui-org/react";
import { BookText, FileText, Forward, Image, MoreHorizontal, PanelLeft } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import AddNoteDropdown from "./AddNoteDropdown";
import BigNavDropdown from "./BigNavDropdown";
import NavbarMenuDisplay from "./NavbarMenuDisplay";
import ShareDropdown from "./ShareDropdown";
// import {AcmeLogo} from "./AcmeLogo.jsx";

export default function DocumentNav({firstName, lastName, documentId, userEmail, documentTitle, html}:{firstName:string; lastName:string; documentId:string; userEmail:string; documentTitle:string | null; html:string}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const elRef = useRef<HTMLElement>(null)
  const {pageTitle, setPageTitle} = useDocumentContext()

  useEffect(() => {
   setIsMounted(true)
   if(isMounted) {
  }
  setPageTitle(documentTitle!)
  }, [isMounted]);

  // useEffect(() => {
  //   if(isMounted) {
  //     setPageTitle('molly')
  //   }
  // },[isMounted])

  console.log('chagmou', isMounted, pageTitle);
  


  
  async function handleExport () {
    const finalHtmlString = `  <h1 style="color: black; text-align: left; font-size:36px; font-weight:700; margin-bottom:10px; ">${pageTitle}</h1>`
    const storedHtml:string = finalHtmlString + (localStorage.getItem(`savedHtml-${documentId}`) ?? html) + `<p style="margin-top:5px;">  </p>` 
    generatePDF(storedHtml)
  }

  console.log(localStorage.getItem('savedHtml'));
  
  return (
    <Navbar className="" maxWidth="full" isBordered>
    
      {/* <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent> */}
      <NavbarContent as="div" justify="start">
        <BigNavDropdown userEmail={userEmail} firstName={firstName} lastName={lastName} />
        <div className="flex w-full items-center justify-between px-4">
          <NavbarMenuToggle className="lg:hidden w-6 h-6" aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
          <NavbarMenuDisplay userEmail={userEmail} firstName={firstName} lastName={lastName} />
          <div className="flex items-center gap-8">
            <PanelLeft className="text-[#212121] hidden lg:block" />
            {<span className="text-base font-bold">{pageTitle || 'untitled'}</span>}
          </div>
          <div className="flex items-center">
            <Dropdown backdrop="blur">
              <DropdownTrigger >
                <Button variant="solid" isIconOnly className="bg-[#367EE7] text-white font-bold mr-2 p-0 ">
                  {/* <span className="hidden sm:block" ref={elRef}>Export as</span> */}
                  <Forward />
                </Button>
              </DropdownTrigger>
              <DropdownMenu variant="faded" className="font-bold" aria-label="Static Actions">
        <DropdownItem key="new" onClick={handleExport}  endContent={<FileText className="font-bold text-sm text-[#262828]" />}>PDF</DropdownItem>
        <DropdownItem key="copy" endContent={<Image className="font-bold text-sm text-[#262828]" />}>Image</DropdownItem>
        <DropdownItem key="edit" endContent={<BookText className="font-bold text-sm text-[#262828]" />}>MarkDown</DropdownItem>

      </DropdownMenu>
            </Dropdown>
            <AddNoteDropdown />
            <ShareDropdown key={documentId} docId={documentId} />
          </div>
        </div>
      </NavbarContent>


    </Navbar>
  );
}

