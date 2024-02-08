import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils";
import { ChevronDown,  Cog,  Rocket, Users } from "lucide-react";


interface SpaceDropdownProps {
    className?:string;
    fullName?:string | null;
}
export function SpaceDropdown({className, fullName}:SpaceDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(className)} asChild>
        <div className="flex px-4 items-center gap-4 cursor-pointer">
        <Rocket className="text-black/50 text-md w-4 h-4" />
        <p className="text-md font-semibold text-black/50">{fullName+ ' ' + 'space'}</p>
        <ChevronDown className="text-black/50 text-md w-4 h-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{fullName?.split(' ')[0]}&apos;s space</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <div className="flex items-center gap-4">
                <Cog className="w-4 h-4 text-black/75" />
                <p>Setting and members</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
          <div className="flex items-center gap-4">
                <Users className="w-4 h-4 text-black/75" />
                <p>Invite people</p>
            </div>
          </DropdownMenuItem>
          </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
