import { z } from "zod";

export const RegisterSchema = z.object({
    email:z.string().email(),
    password:z.string().min(8, {message:"password must be at least 8 characters long"}),
    confirmPassword:z.string().min(8, {message:"password must be at least 8 characters long"}),
})

export type RegisterSchemaType = z.infer<typeof RegisterSchema>

export const signInSchema = z.object({
    email:z.string().email(),
    password:z.string().min(8, {message:"password must be at least 8 characters long"}),
})

export type SignInType = z.infer<typeof signInSchema>

export const MoreInfoSchema = z.object({
    firstName:z.string().min(2, {message:"first name cannot be less than 2 characters"}),
    LastName:z.string().min(2, {message:"last name cannot be less than 2 characters"}),
})

export type MoreInfoType = z.infer<typeof MoreInfoSchema>
