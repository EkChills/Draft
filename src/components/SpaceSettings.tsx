import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Dispatch, SetStateAction } from "react";
import { Separator } from "./ui/separator";

interface SpaceSettingsProps {
  openSpaceSettingsDialog:boolean;
  setOpenSpaceSettingsDialog:Dispatch<SetStateAction<boolean>>
}


export function SpaceSettings({openSpaceSettingsDialog,setOpenSpaceSettingsDialog}:SpaceSettingsProps) {
  return (
    <Dialog open={openSpaceSettingsDialog} onOpenChange={() => setOpenSpaceSettingsDialog(prev => !prev)}>
      <DialogContent className="sm:max-w-[600px] shadow-2xl">
        <DialogHeader>
          <DialogTitle>Members</DialogTitle>
        </DialogHeader>
        <Separator className="" />
        <div>
          <h5 className="font-semibold">Invite Via Link</h5>
          <p className="font-semibold text-black/50">Share this secret link to invite people to this space. Only owners can see this</p>
          <div className="mt-4 flex border-1 justify-between p-4">
            <p className="font-semibold">{'https://draft-sand.vercel.app'}</p>
            <p className="font-semibold">Copy</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
