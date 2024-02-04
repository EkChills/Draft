"use client"

import React, { type Dispatch,type SetStateAction } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteDocumentAction } from "@/lib/actions/DeleteDocumentAction";

export default function DeleteDocModal({isOpenPayment, setIsOpenPayment, docId, docTitle}:{isOpenPayment:boolean, docTitle:string, setIsOpenPayment:Dispatch<SetStateAction<boolean>>; docId:string}) {
  const router = useRouter()
  const boundDeleteAction = deleteDocumentAction.bind(null, {docId:docId})
const handleDelete = async() => {
  await boundDeleteAction()
  router.push('/all-documents')
}

  return (
    <>
      {/* <Button onPress={onOpen}></Button> */}
      <Modal isOpen={isOpenPayment} onOpenChange={() => setIsOpenPayment(prev => !prev)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader >Upgrade to pro</ModalHeader>
              <ModalBody>
                <p className="text-black/70"> 
                  Are you sure you want to delete this document "{docTitle}" ?
                </p>
            
              </ModalBody>
              <ModalFooter>
                <Button onClick={handleDelete} color="danger" >
                    Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
