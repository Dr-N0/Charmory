'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { signIn, signOut } from 'next-auth/react'
import style from '@/app/Home.module.css'

export const LoginButton = () => {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  var parsed = `${searchParams}`

  if (pathName === '/login') {
    return (
      <Link href={{ pathname: '/register', query: parsed }} className={style.noSelect} replace>
        <button className={`${style.noSelect} ${style.button} ${style.hvrFade} ${style.solidBackground}`}>Register</button>
      </Link>
    )
  } else if (pathName === '/register') {
    return (
      <Link href={{ pathname: '/login', query: parsed }} className={style.noSelect} replace>
        <button className={`${style.noSelect} ${style.button} ${style.hvrFade} ${style.solidBackground}`}>Sign in</button>
      </Link>
    )
  }

  return <button className={`${style.noSelect} ${style.button} ${style.hvrFade} ${style.solidBackground}`} onClick={() => signIn()}>Sign in</button>
}

export const LogoutButton = () => {
  return <button className={`${style.noSelect} ${style.button} ${style.hvrFade} ${style.solidBackground}`} onClick={() => signOut()}>Sign Out</button>
}