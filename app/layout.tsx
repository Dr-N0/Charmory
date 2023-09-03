import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ColorLoader from './components/ColorLoader';
import Nav from '@/app/components/Nav'
import FireParticles from './components/FireParticles';
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
        <FireParticles />
        <Nav />
        <Providers>{children}</Providers>
        <div className="page-bg"></div>
        <div className="animation-wrapper">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
        </div>
        <div className='page-wrapper'></div>
      </body>
    </html>
  )
}
