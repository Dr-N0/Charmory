import Link from 'next/link'
import style from '@/app/Home.module.css'

export default function Nav() {
  return (
    <nav className={style.navigation}>
      <Link href={`/`}>
          <h1>
              <span className={style.ch}>Ch</span>
              <span className={style.ar}>ar</span>
              <span className={style.mory}>mory</span>
          </h1>
      </Link>
    </nav>
  );
}