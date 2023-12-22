import { api } from '@/trpc/react'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { ChevronDown, FilePlus2, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import LoadingDisplay from './LoadingDisplay'

export default function AddNoteDropdown() {
  const {mutate:addDocument, isSuccess, data,isLoading} = api.document.addNewDocument.useMutation()
  const router = useRouter()
  if(isLoading) {
    return <LoadingDisplay loadingMessage='Creating document' />
  }
  if(isSuccess) {
    router.push(`/all-documents/document/${data.documentId}`)
  }
  return (
    <Dropdown placement='bottom-end'>
      <div className="flex gap-2">
            
              {/* <Button className="hidden lg:block" isDisabled>Beta</Button> */}
              <DropdownTrigger>
              <Button className="gap-2 font-semibold hidden lg:flex"  variant="bordered">
                <Plus />
                <span className="hidden lg:block">New</span>
                <ChevronDown className="hidden lg:block" />
              </Button>
              </DropdownTrigger>
              <Dropdown>
                <DropdownTrigger>
              <Button className="flex gap-2 font-semibold lg:hidden"  isIconOnly  variant="bordered">
               <Plus />
              </Button>

                </DropdownTrigger>
                <DropdownMenu className='' aria-label="Profile Actions" variant="flat">
              <DropdownItem onClick={() => addDocument()}>
                <span className='w-full bg-[#EDEEF5] p-6 rounded-lg flex items-center gap-4'>
                  <FilePlus2 className='text-[#636DAD]' />
                  <span className='flex flex-col gap-0'>
                    <h3 className='font-bold capitalize'>New Document</h3>
                    <p className='text-sm text-gray-500'>Start writing on a blank page</p>
                  </span>
                </span>
              </DropdownItem>
        </DropdownMenu>

              </Dropdown>
            </div>

      <DropdownMenu className='' aria-label="Profile Actions" variant="flat">
              <DropdownItem onClick={() => addDocument()}>
                <span className='w-full bg-[#EDEEF5] p-6 rounded-lg flex items-center gap-4'>
                  <FilePlus2 className='text-[#636DAD]' />
                  <span className='flex flex-col gap-0'>
                    <h3 className='font-bold capitalize'>New Document</h3>
                    <p className='text-sm text-gray-500'>Start writing on a blank page</p>
                  </span>
                </span>
              </DropdownItem>
        </DropdownMenu>
    </Dropdown>
  )
}
