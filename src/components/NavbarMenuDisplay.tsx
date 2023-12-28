import { NavbarMenuItem, NavbarMenu, Avatar, Button, } from "@nextui-org/react";
import React from "react";

interface NavbarMenuDisplayProps {
  firstName:string;
  lastName:string;
  userEmail?:string;
}
export default function NavbarMenuDisplay({firstName, lastName, userEmail}:NavbarMenuDisplayProps) {
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
        <Button  className="w-full" variant="ghost">Log out</Button>
      </NavbarMenuItem>
    </NavbarMenu>
  );
}
