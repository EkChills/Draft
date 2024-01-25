"use client"

import { Button } from '@nextui-org/react'
import { BadgeCheck } from 'lucide-react'
import React, { useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import { toast } from 'react-toastify'

export default function SaveDocButton() {
  const {pending} = useFormStatus()


  return (
    <div className='flex mt-4 justify-end'>
    <Button type='submit' variant="solid"  isLoading={pending} color='secondary'>
      Save
    </Button>
  </div>
  )
}
