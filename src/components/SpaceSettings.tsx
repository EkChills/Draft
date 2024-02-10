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
import { useDocumentContext } from "@/lib/context/DocumentContext";
import { api } from "@/trpc/react";
import MemberNameDisplay from "./MemberNameDisplay";

interface SpaceSettingsProps {
  openSpaceSettingsDialog:boolean;
  setOpenSpaceSettingsDialog:Dispatch<SetStateAction<boolean>>
}



export function SpaceSettings({openSpaceSettingsDialog,setOpenSpaceSettingsDialog}:SpaceSettingsProps) {
  const {spaceId} = useDocumentContext()
  const {data} = api.document.getSpaceMembers.useQuery({spaceId:spaceId!})
  console.log(data);
  
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
          <div className="mt-4 flex border-1 justify-between p-4 w-full">
            <p className="font-semibold truncate max-w-[260px] md:max-w-[400px]">{`https://draft-sand.vercel.app/space-invite?id=${spaceId}`}</p>
            <p className="font-semibold">Copy</p>
          </div>
        </div>
        <Separator className="mb-2" />
        <div>
          <h6 className="text-md font-semibold mb-2">Members({data?.members?.length ?? 0})</h6>
          {data?.members.map((member) => {
            return <MemberNameDisplay fullName={member.user.firstName + ' ' + member.user.lastName} email={member.user.email} />
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}
