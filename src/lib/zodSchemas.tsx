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