import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const BaseUrl = process.env.NODE_ENV === "production" ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000' 
export const baseUrlClient = process.env.NODE_ENV === "production" ? "https://draft-sand.vercel.app" :  'http://localhost:3000' 