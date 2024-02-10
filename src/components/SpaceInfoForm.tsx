import { db } from '@/server/db'
import { space } from '@/server/db/schema'
import { Button, Input } from '@nextui-org/react'
import React from 'react'
import { z } from 'zod'
import {v4 as uuid} from 'uuid'
import { getServerAuthSession } from '@/server/auth'
import { revalidatePath } from 'next/cache'
import SaveDocButton from './serverButtons/saveDocButton'

enum Color {
  primary = "primary", 
  secondary = "secondary",
  danger = "danger"
}
export default function SpaceInfoForm() {

  async function submitSpaceAction (formData:FormData) {
    "use server"

    const session = await getServerAuthSession()
    try {
      if(session) {
        const SpaceNameSchema = z.string()
        const spaceName = formData.get('spaceName')
        const parsedName = SpaceNameSchema.parse(spaceName)
        console.log(parsedName);
        
        await db.insert(space).values({hostId:session.userId, id:uuid(), spaceName:parsedName})
        revalidatePath('/')
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <form className="mx-auto mt-12 w-full sm:max-w-[26.375rem]" action={submitSpaceAction}>
    <Input type="text"  className="w-full" name='spaceName' label="Space Name"  />
    <SaveDocButton color={Color.primary} size='lg' fullWidth />
  </form>
  )
}
