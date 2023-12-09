import MainNavbar from '@/components/MainNavbar';
import { Navbar } from '@nextui-org/react';
import React from 'react'

export default function layout({
    children,
  }: {
    children: React.ReactNode;
  }) {
  return (
    <main>
        <MainNavbar />
        {children}
        </main>
  )
}
