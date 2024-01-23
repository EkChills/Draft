"use client"

import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import {Eye, EyeOff} from 'lucide-react'
import { api } from "@/trpc/react";
import {type SubmitHandler, useForm} from 'react-hook-form'
import {  type SignInType, signInSchema } from "@/lib/zodSchemas";
import {zodResolver} from '@hookform/resolvers/zod'
import {signIn} from 'next-auth/react'
import { useRouter } from "next/navigation";

export default function SignInForm() {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    // const {mutate,isLoading} = api.user.registerUser.useMutation()
    const [isLoading, setIsLoading]  = useState<boolean>(false)
    const {handleSubmit, formState:{errors}, register} = useForm<SignInType>({resolver:zodResolver(signInSchema)})
    const router = useRouter()

    const toggleVisibility = () => {
        setIsVisible(prev => !prev)
    }

    

   const handleLogin:SubmitHandler<SignInType> = async function(data) {
      try {
        setIsLoading(true)
        const callBack = await signIn("credentials", {email:data.email, password:data.password, redirect:false})
        if(callBack?.ok) {
          router.push('/more-info')
        } 
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false)
      }
    }
  return (
    <form className="mx-auto mt-12 w-full sm:max-w-[26.375rem]" onSubmit={handleSubmit(handleLogin)}>
      <Input type="email"  {...register("email")} className="w-full" label="Email" errorMessage={errors.email?.message} isInvalid={errors.email ? true : false} />
      <Input
        type={isVisible ? 'text' : 'password'}
        className="my-4 w-full"
        placeholder="Enter your password"
        label="Password"
        isInvalid={errors.password ? true : false}
        errorMessage={errors.password?.message}
        {...register("password")}
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <Eye className="pointer-events-none text-2xl text-default-400" />
            ) : (
              <EyeOff className="pointer-events-none text-2xl text-default-400" />
            )}
          </button>
        }
      />
      <Button type="submit" isLoading={isLoading} color="primary" size="lg" fullWidth className="mt-2">Continue</Button>
    </form>
  );
}
