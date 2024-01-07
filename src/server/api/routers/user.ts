import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { eq } from "drizzle-orm";
import { activateToken, customerCode, user } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { v4 as uuid } from "uuid";
import {Resend} from 'resend'
import { env } from "@/env";
import WelcomeEmail from "@/emails/Welcome";
import { BaseUrl } from "@/lib/utils";
import axios from 'axios'
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";

const paystackCustomerRes = {
  data:{

  "status": true,

  "message": "Customer created",

  "data": {

    "email": "customer@email.com",

    "integration": 100032,

    "domain": "test",

    "customer_code": "CUS_xnxdt6s1zg1f4nx",

    "id": 1173,

    "identified": false,

    "identifications": null,

    "createdAt": "2016-03-29T20:03:09.584Z",

    "updatedAt": "2016-03-29T20:03:09.584Z"

  }
}

}

type paystackCustomerType = typeof paystackCustomerRes


export const userRouter = createTRPCRouter({
  registerUser: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log(await ctx.db.query.user.findMany());
      
      const dbUser = await ctx.db.query.user.findFirst({
        where: eq(user.email, input.email),
        
      });
      if (dbUser) throw new TRPCError({ code: "FORBIDDEN" });
      const randToken =  (randomUUID() + randomUUID()).replaceAll("-", "")
      const hashedPassword = await bcrypt.hash(input.password, 10);
      const createdUser = await ctx.db
        .insert(user)
        .values({id:uuid(), email: input.email, password: hashedPassword}).returning({userId:user.id});
      await ctx.db
        .insert(activateToken)
        .values({ id:uuid(),token: randToken, userId:createdUser[0]?.userId });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      const resend = new Resend(env.RESEND_API_KEY) 

    
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to:input.email,
        subject: `Activate Your draft Account: Confirm Your Email Now! `,
        react:WelcomeEmail({verificationLink:`${BaseUrl}/activate/${randToken}`}),
      });

      

      return {
        success:true,
        message:"account created"
      }
    }),
    loginUser: publicProcedure.input(z.object({
      email:z.string(),
      password:z.string()
    })).mutation(async({ctx, input}) => {
      const dbUser = await ctx.db.query.user.findFirst({
        where:eq(user.email, input.email)
      })
      if(dbUser && !dbUser.active ) {
        throw new Error("user is not activated")
      }
      if(!(await bcrypt.compare(input.password, dbUser!.password!))) {
        throw new TRPCError({code:"FORBIDDEN"})
      }
      return {
        ...dbUser
      }
    }),
    saveNames:protectedProcedure.input(z.object({
      firstName:z.string(),
      lastName:z.string()
    })).mutation(async({ctx,input}) => {
      await ctx.db.update(user).set({firstName:input.firstName, lastName:input.lastName}).where(eq(user.email, ctx.session!.user.email!))
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.PAYSTACK_SECRET_KEY}`
      };
      
      const paystackRes:paystackCustomerType = await axios.post('https://api.paystack.co/customer', {email:ctx.session.user.email, first_name:input.firstName, last_name:input.lastName, phone:"+2348123456789"}, {headers})
      await db.insert(customerCode).values({userId:ctx.session.userId, customerCode:paystackRes.data.data.customer_code})
      console.log(paystackRes);
      return {
        success:true,
        customerId:paystackRes.data.data.customer_code
      }
    }),
    subscribeToPlan:protectedProcedure.input(z.object({customerCode:z.string()})).mutation(async({ctx,input}) => {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.PAYSTACK_SECRET_KEY}`
      };
      try {
        const customerCodeString = await ctx.db.select().from(customerCode).where(eq(customerCode.userId, ctx.session.userId))      
        const payPlan:{
          data:{
            data:{
              authorization_url:string
            }
          }
        } = await axios.post('https://api.paystack.co/transaction/initialize', {
          email:ctx.session.user.email,
          amount:1000000,
          plan:'PLN_t0gluvovnmtmuam'
        }, {headers})     
        console.log(payPlan);
           
        return {
          success:true,
          success_url:payPlan.data.data.authorization_url
        }

        // const subscription = await axios.post('https://api.paystack.co/subscription',{customer:customerCodeString[0]?.customerCode, plan:'PLN_t0gluvovnmtmuam'},{headers})
        // console.log(subscription);
      } catch (error) {
        console.log(error);
        return {
          success:false
        }
      }

    
      
    })

});

