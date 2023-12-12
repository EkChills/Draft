import { cn } from '@nextui-org/system';
import React from 'react'
import TabsDisplay from './TabsDisplay';

export default function BigSidebar({className}:{className?:string;}) {
  return (
    <div className={cn('fixed z-50 top-[4rem] left-0 w-[340px] px-2 bottom-0 hidden lg:flex ', className)}>
        <TabsDisplay />
    </div>
  )
}
