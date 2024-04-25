import { Card, CardBody, } from '@nextui-org/react'
import React from 'react'
import { Skeleton } from './ui/skeleton'

export default function SpaceDocsLoading() {
  const mappedArray = Array.from({length:7}, (item, idx) => idx)
  return (
    <div className='flex flex-col md:flex-row lg:flex-wrap gap-6 '>
       {mappedArray.map((doc,idx) => {
            return (
              <Card className="md:max-w-[400px]  w-full md:min-w-[400px] max-h-[280px] ">
              <CardBody className="flex flex-col  gap-8 ">
                <div className="flex items-center justify-between w-full space-x-4">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className='h-4 w-4' />
                </div>
                <div className="overflow-y-scroll scrollbar-hide flex flex-col gap-2">
                <Skeleton className='h-4 w-[40px]' />
                <Skeleton className='h-4 w-[200px]' />
                <Skeleton className='h-4 w-[240px]' />
                </div>
                <div className="flex items-center justify-end mt-auto">
                    <Skeleton className='w-16 h-full' />
                </div>
              </CardBody>
            </Card>
            )
        })}
    </div>
  )
}
