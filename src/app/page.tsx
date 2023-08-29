import Link from 'next/link'
import style from './Home.module.css'

export default function Home() {
  return (
    <main>
      <section className={style.showcase}>
        <h1>
          <span className={style.ch}>Ch</span>
          <span className={style.ar}>ar</span>
          <span className={style.mory}>mory</span>
        </h1>
        <Link href={`/characters`}>
          <button>Get Going!</button>
        </Link>
      </section>
    </main>
  );
}
