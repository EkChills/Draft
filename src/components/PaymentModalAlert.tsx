"use client"

import React, { type Dispatch,type SetStateAction } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PaymentModalAlert({isOpenPayment, setIsOpenPayment}:{isOpenPayment:boolean, setIsOpenPayment:Dispatch<SetStateAction<boolean>>}) {
  const router = useRouter()
const handleUpgrade = ():void => {
  router.push('/pricing')
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
                <p> 
                You've reached the maximum character limit for free users. Upgrade to Pro to continue creating documents.
                </p>
            
              </ModalBody>
              <ModalFooter>
                <Button onClick={handleUpgrade} color="primary" onPress={onClose}>
                    Upgrade
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
