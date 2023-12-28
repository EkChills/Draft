import "@/styles/globals.css";

import { Inter,Space_Grotesk,Poppins } from "next/font/google";
import { cookies } from "next/headers";
import { NextUIProvider } from "@nextui-org/system";

import { TRPCReactProvider } from "@/trpc/react";
import { NextUiProvider } from "@/components/providers/NextUiProvider";
import { RouteProvider } from "@/components/providers/RouteProvider";
import NextAuthSessionProvider from "@/components/providers/NextAuthSessionProvider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});



export const metadata = {
  title: "Draft web app",
  description: "Document creation made easy",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <NextUiProvider>
            <RouteProvider>
            <NextAuthSessionProvider>
              {children}
              </NextAuthSessionProvider>
              </RouteProvider>
        <ToastContainer />
          </NextUiProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
