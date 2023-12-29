import React from 'react'
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
import { ChevronDown } from 'lucide-react';
import { getServerAuthSession } from '@/server/auth';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function BigNavDropdown({firstName, lastName, userEmail}:{firstName:string; lastName:string; userEmail?:string}) {
  const router = useRouter()
  async function handleLogout () {
    await signOut()
  }
  return (
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
                  {firstName} {lastName}
                </p>
              </div>
              <ChevronDown />
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{userEmail ?? userEmail}</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem onClick={handleLogout} key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
  )
}
