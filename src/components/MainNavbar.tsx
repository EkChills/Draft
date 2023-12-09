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
// import {AcmeLogo} from "./AcmeLogo.jsx";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  return (
    <Navbar className="" maxWidth="full" isBordered>
      {/* <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent> */}
      <NavbarContent as="div" justify="start">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <div className="lg:flex w-[340px] cursor-pointer items-center justify-between  hidden ">

              <div className="flex items-center gap-4">
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform "
                  color="secondary"
                  name="Jason Hughes"
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"

                />
                <p className="text-base font-medium text-[#282828]">
                  Casey smith
                </p>
              </div>
              <ChevronDown />
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <div className="flex w-full items-center justify-between px-4">
        <NavbarMenuToggle className="lg:hidden" aria-label={isMenuOpen ? "Close menu" : "Open menu"} />

          <div className="flex items-center gap-8">
            <PanelLeft className="text-[#212121] hidden lg:block" />
            <span className="text-base font-bold">All Documents</span>
          </div>
          <div className="flex items-center">
            <div className="flex gap-2">
              <Button className="hidden lg:block" isDisabled>Beta</Button>
              <Button className="gap-2 font-semibold hidden lg:flex"  variant="bordered">
                <Plus />
                <span className="hidden lg:block">New</span>
                <ChevronDown className="hidden lg:block" />
              </Button>
              <Button className="flex gap-2 font-semibold lg:hidden" isIconOnly  variant="bordered">
               <Plus />
              </Button>
            </div>
            <Button isIconOnly variant="ghost" className="ml-4" aria-label="more">
              <MoreHorizontal />
              </Button>
          </div>
        </div>
      </NavbarContent>
    </Navbar>
  );
}
