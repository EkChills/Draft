import { cn } from '@nextui-org/system';
import React from 'react'

export default function MaxWidthWrapper
({className, children}:{className?:string; children:React.ReactNode}) {
    
  return (
    <div className={cn('fixed top-[4rem] left-0  lg:left-[340px] bottom-0 right-0', className)}>
        {children}
    </div>
  )
}
