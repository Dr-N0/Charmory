import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ColorLoader from './components/ColorLoader';
import Nav from '@/app/components/Nav'
import { Providers } from "./providers";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Charmory',
  description: 'Armory for your DND needs',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <ColorLoader></ColorLoader>
        <Nav />
        <Providers>{children}</Providers>
        {/* USE FIRE/ASH ANIMATION FOR OPENING PAGE */}
        {/* USE NETFLIX FOR CHARACTER SHEET AND CREATE */}
        {/* Different particle background per race/class they choose */}
        <div className="page-bg"></div>
        <div className="animation-wrapper">
          <div className='light x1'></div>
          <div className='light x2'></div>
          <div className='light x3'></div>
          <div className='light x4'></div>
          <div className='light x5'></div>
          <div className='light x6'></div>
          <div className='light x7'></div>
          <div className='light x8'></div>
          <div className='light x9'></div>
          {/* <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div> */}
        </div>
        <div className='page-wrapper'></div>
      </body>
    </html>
  )
}
