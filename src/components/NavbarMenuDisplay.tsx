import { NavbarMenuItem, NavbarMenu, Avatar, Button, } from "@nextui-org/react";
import React from "react";
import {signOut} from 'next-auth/react'
import { useRouter } from "next/navigation";

interface NavbarMenuDisplayProps {
  firstName:string;
  lastName:string;
  userEmail?:string;
}
export default function NavbarMenuDisplay({firstName, lastName, userEmail}:NavbarMenuDisplayProps) {
  const router = useRouter()
  const signOutHandler = async() => {
    await signOut()
    router.push('/register')
  }
  return (
    <NavbarMenu>
      <NavbarMenuItem>
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

      </NavbarMenuItem>
      <NavbarMenuItem>
        <Button  className="w-full" onClick={signOutHandler} variant="ghost">Log out</Button>
      </NavbarMenuItem>
    </NavbarMenu>
  );
}
