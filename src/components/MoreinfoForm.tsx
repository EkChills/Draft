"use client"

import { MoreInfoSchema, type MoreInfoType } from "@/lib/zodSchemas";
import { api } from "@/trpc/react";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from "@nextui-org/react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, type SubmitHandler } from 'react-hook-form';

export default function MoreInfoForm({session}:{session:Session}) {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    // const {mutate,isLoading} = api.user.registerUser.useMutation()
    const {handleSubmit, formState:{errors}, register} = useForm<MoreInfoType>({resolver:zodResolver(MoreInfoSchema)})
    const {data, isLoading:isMutating, mutate, isSuccess} = api.user.saveNames.useMutation()
    const router = useRouter()
    const {update} = useSession()
    // console.log(data?.user);
    

    const toggleVisibility = () => {
        setIsVisible(prev => !prev)
    }

    

   const handleLogin:SubmitHandler<MoreInfoType> = async function(data) {
      try {
        mutate({firstName:data.firstName, lastName:data.LastName})
        if(isSuccess) {
          router.push('/all-documents')
          await update({...session, firstName:data.firstName, lastName:data.LastName, user:{
            ...session.user,
            firstName:data.firstName,
            lastName:data.LastName
          }})
        }
        // const callBack = await signIn("credentials", {email:data.email, password:data.password, redirect:false})
        // if(callBack?.ok) {
        //   router.push('/all-documents')
        // } 
      } catch (error) {
        console.log(error);
      } 
    }
  return (
    <form className="mx-auto mt-12 w-full sm:max-w-[26.375rem]" onSubmit={handleSubmit(handleLogin)}>
      <Input type="text" {...register("firstName")} className="w-full" label="First Name" errorMessage={errors.firstName?.message} isInvalid={errors.firstName ? true : false} />
      <Input
        type={'text'}
        className="my-4 w-full"
        // placeholder="eg. Maleficent"
        label="Last Name"
        isInvalid={errors.LastName ? true : false}
        errorMessage={errors.LastName?.message}
        {...register("LastName")}
        
      />
      <Button type="submit" isLoading={isMutating} color="primary" size="lg" fullWidth className="mt-2">Continue</Button>
    </form>
  );
}
