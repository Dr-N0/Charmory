import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from "./providers";
import ColorLoader from './components/ColorLoader';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Charmory',
  description: 'Armory for your DND needs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <ColorLoader></ColorLoader>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
