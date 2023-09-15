'use client'

import { signIn, signOut } from 'next-auth/react'
import style from '@/app/Home.module.css'

export const LoginButton = () => {
  return <button className={`${style.button} ${style.hvrFade} ${style.solidBackground}`} onClick={() => signIn()}>Sign in</button>
}

export const LogoutButton = () => {
  return <button className={`${style.button} ${style.hvrFade} ${style.solidBackground}`} onClick={() => signOut()}>Sign Out</button>
}