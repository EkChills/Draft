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
import { Dispatch, SetStateAction, useState } from "react";
import { Separator } from "./ui/separator";
import { useDocumentContext } from "@/lib/context/DocumentContext";
import { api } from "@/trpc/react";
import MemberNameDisplay from "./MemberNameDisplay";
import { useSession } from "next-auth/react";
import { baseUrlClient } from "@/lib/utils";
import { toast } from "react-toastify";
import { Check } from "lucide-react";

interface SpaceSettingsProps {
  openSpaceSettingsDialog:boolean;
  setOpenSpaceSettingsDialog:Dispatch<SetStateAction<boolean>>
}



export function SpaceSettings({openSpaceSettingsDialog,setOpenSpaceSettingsDialog}:SpaceSettingsProps) {
  const {spaceId} = useDocumentContext()
  const [isCopied, setIsCopied] = useState<boolean>(false)
  const {data} = api.document.getSpaceMembers.useQuery({spaceId:spaceId!})
  const session = useSession()
  const copyUrl = `${baseUrlClient}/space-invite?id=${spaceId}`
  console.log(data);
  
  const handleCopy = async() => {
    await navigator.clipboard.writeText(copyUrl)
    setIsCopied(true)
    toast.success('url copied')
    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }
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
          <div className="mt-4 flex border-1 justify-between items-center p-4 w-full cursor-pointer" onClick={handleCopy}>
            <p className="font-semibold truncate max-w-[260px] md:max-w-[400px]">{`${baseUrlClient}/space-invite?id=${spaceId}`}</p>
            { isCopied ? <Check className="w-4 h-4" /> : <p className="font-semibold">Copy</p>}
          </div>
        </div>
        <Separator className="my-2" />
        <div className="flex flex-col gap-2" >
          <h6 className="text-md font-semibold ">Members({data?.members.length ? data.members.length + 1 : 1})</h6>
          <MemberNameDisplay fullName={session.data?.user.firstName + ' ' + session.data?.user.lastName} email={session.data?.user.email ?? ''} isOwner />
          {data?.members.map((member) => {
            return <MemberNameDisplay fullName={member.user.firstName + ' ' + member.user.lastName} email={member.user.email} />
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}
