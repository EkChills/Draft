import React from 'react'
import {Button} from '@nextui-org/button'
import Link from 'next/link'
import { redirect } from 'next/navigation'


export default function Home() {
  redirect('/all-documents')
  return (
    <div>
      <Link href={'/signin'}>press me</Link>
    </div>
  )
}
