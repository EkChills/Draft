import React from 'react'
import {Button} from '@nextui-org/button'
import Link from 'next/link'


export default function Home() {
  return (
    <div>
      <Link href={'/signin'}>press me</Link>
    </div>
  )
}
