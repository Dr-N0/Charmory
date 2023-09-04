'use client'

import { signIn, signOut } from 'next-auth/react'
import style from '@/app/Home.module.css'

export const LoginButton = () => {
  return <button className={`${style.hvrFade}`} onClick={() => signIn()}>Sign in</button>
}

export const LogoutButton = () => {
  return <button className={`${style.hvrFade}`} onClick={() => signOut()}>Sign Out</button>
}