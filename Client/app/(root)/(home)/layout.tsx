
import NavBar from '@/components/NavBar';
import { Metadata } from 'next';
import React, {ReactNode} from 'react'

export const metadata: Metadata = {
    title: "Library",
    description: "Library",
  icons: {
    icon: '/book-logo.png'
  }
};


const RootLayout = ({children} : {children : ReactNode}) => {

  return (
    <main>
        <NavBar />
        {children}
    </main>
  )
}

export default RootLayout