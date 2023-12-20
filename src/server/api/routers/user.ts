import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { eq } from "drizzle-orm";
import { activateToken, user } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { v4 as uuid } from "uuid";
import {Resend} from 'resend'
import { env } from "@/env";
import WelcomeEmail from "@/emails/Welcome";
import { BaseUrl } from "@/lib/utils";

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
      return {
        success:true
      }
    })

});

