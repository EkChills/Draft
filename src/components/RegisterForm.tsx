"use client"

import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import {Eye, EyeOff} from 'lucide-react'
import { api } from "@/trpc/react";
import {type SubmitHandler, useForm} from 'react-hook-form'
import { RegisterSchema, type RegisterSchemaType } from "@/lib/zodSchemas";
import {zodResolver} from '@hookform/resolvers/zod'
import { useRouter } from "next/navigation";


const rat = {
  whisker:{
    name:"drop",
    breed:"nothing"
  },
  brand:{
    name:"prot",
    breed:"top"
  }
}

type Pro = typeof rat

type Rat = {
  [K in keyof Pro]:{
    name:string;
    breed:string;
  }
}

const bo:Rat = {
  brand:{
    breed:'dock',
    name:"dd"
  },
  whisker:{
    breed:"form",
    name:"trunk"
  }
}

export default function RegisterForm() {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const {mutate,isLoading, isSuccess} = api.user.registerUser.useMutation()
    const router = useRouter()
    const {handleSubmit, formState:{errors}, register} = useForm<RegisterSchemaType>({resolver:zodResolver(RegisterSchema)})

    const toggleVisibility = () => {
        setIsVisible(prev => !prev)
    }

    

   const handleRegister:SubmitHandler<RegisterSchemaType> = async function(data) {
      mutate({email:data.email, password:data.password})
      if(isSuccess) {
        router.push('/verify-email') 

      }
    }
  return (
    <form className="mx-auto mt-12 w-full sm:max-w-[26.375rem]" onSubmit={handleSubmit(handleRegister)}>
      <Input type="email" {...register("email")} className="w-full" label="Email" errorMessage={errors.email?.message} isInvalid={errors.email ? true : false} />
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
      <Input
        type={isVisible ? 'text' : 'password'}
        className="my-4 w-full"
        placeholder="Confirm password"
        label="confirm password"
        isInvalid={errors.confirmPassword ? true : false}
        errorMessage={errors.confirmPassword?.message}
        {...register("confirmPassword")}
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
