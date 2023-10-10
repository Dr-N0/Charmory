'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import style from '@/app/Home.module.css'

export const CharacterLink = () => {
  const pathName = usePathname();

  if (pathName == '/characters/builder') {
    return (
        <a className={`${style.noSelect}`} href={`/characters`}>
            <button className={`${style.button} ${style.hvrFadeWhite} ${style.solidBackground}`}>
                Characters
            </button>
        </a>
    )
  } else {
    return (
        <Link className={`${style.noSelect}`} href={`/characters`}>
            <button className={`${style.button} ${style.hvrFadeWhite} ${style.solidBackground}`}>
                Characters
            </button>
        </Link>
    )
  }

  
}