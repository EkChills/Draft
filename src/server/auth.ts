import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
  User,
} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

import { env } from "@/env";
import { db } from "@/server/db";
import { pgTable } from "@/server/db/schema";
import CredentialsProvider from "next-auth/providers/credentials";
import { api } from "@/trpc/server";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    userId:string;
    user: {
      id: string;
      firstName:string;
      lastName:string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    async jwt({ token, account, user, trigger, session }) {

      // if(trigger === 'update'){
      //   console.log('yes update');

        
      //   return {...token, ...session.user} 
      // }
   
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
        token.id = account.userId
      }
      if(user) {        
        return {...token, ...user}
      }
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      
      // session.accessToken = token.accessToken as string
      // session.userId  = token.id as string
      // session.role = token.Role as Role
      // session.user.image = token.image as string
      // if(token.email) {
        
      //   session.user.email = token.email as string
      // }
      
      session.user.firstName = token.firstName as string ?? "" 
      session.user.lastName = token.lastName as string ?? ""
      session.userId = token.id as string
      return session
    }
  },
  session:{
strategy:'jwt',
maxAge:60 * 60 * 24,
updateAge: 24 * 60 * 60,
  },
  adapter: DrizzleAdapter(db, pgTable),
  providers: [
  
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
    CredentialsProvider({
      name:"Credentials",
      credentials:{
        email:{label:"Email", type:"text", placeholder:"Enter email"},
        password:{label:"password", type:"password", placeholder:"Enter password"},
      },
      async authorize(credentials) {
        const user = await api.user.loginUser.mutate({email:credentials!.email!, password:credentials!.password!})!
        if(user) {
          return user as {id:string} & Omit<typeof user, "id" >
        }
        return null
      }
    })
  ],
  pages:{
    signIn:'/signin'
  }
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
