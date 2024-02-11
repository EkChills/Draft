"use client"

import { Button } from '@nextui-org/react'
import { BadgeCheck } from 'lucide-react'
import React, { useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import { toast } from 'react-toastify'

export enum Color {
  primary = "primary", 
  secondary = "secondary",
  danger = "danger"
}

interface SpaceDocButtonProps {
  fullWidth?:boolean;
  color?:Color;
  size?:'sm' | 'lg'
}
export default function SaveDocButton({fullWidth, color, size}:SpaceDocButtonProps) {
  const {pending} = useFormStatus()


  return (
    <div className='flex mt-4 justify-end'>
    <Button type='submit' variant="solid" fullWidth={fullWidth ? true : false} isLoading={pending} size={size ? size : 'md'} color={color ? color : "secondary"}>
      Save
    </Button>
  </div>
  )
}
