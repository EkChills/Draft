"use client";

import React from "react";
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
import { ChevronDown, MoreHorizontal, PanelLeft, Plus } from "lucide-react";
import BigNavDropdown from "./BigNavDropdown";
import AddNoteDropdown from "./AddNoteDropdown";
import { usePathname } from "next/navigation";
import { useDocumentContext } from "@/lib/context/DocumentContext";
import NavbarMenuDisplay from "./NavbarMenuDisplay";
// import {AcmeLogo} from "./AcmeLogo.jsx";

export default function MainNavbar({firstName, lastName}:{firstName:string; lastName:string;}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const {pageTitle} = useDocumentContext() 
  
  return (
    <Navbar className="" maxWidth="full" isBordered>
      {/* <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent> */}
      <NavbarContent as="div" justify="start">
        <BigNavDropdown firstName={firstName} lastName={lastName} />
        <div className="flex w-full items-center justify-between px-4">
        <NavbarMenuToggle className="lg:hidden w-6 h-6" aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
          <NavbarMenuDisplay firstName={firstName} lastName={lastName} />
          <div className="flex items-center gap-8">
            <PanelLeft className="text-[#212121] hidden lg:block" />
            {<span className="text-base font-bold">All Documents</span>}
          </div>
          <div className="flex items-center">
            <AddNoteDropdown />
            <Button isIconOnly variant="ghost" className="ml-4" aria-label="more">
              <MoreHorizontal />
              </Button>
          </div>
        </div>
      </NavbarContent>
    </Navbar>
  );
}
