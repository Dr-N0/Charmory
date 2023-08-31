import Link from 'next/link'
import style from './Home.module.css'
import { getServerSession } from "next-auth"
import { authOptions } from './api/auth/[...nextauth]/route';
import { LoginButton, LogoutButton } from './auth'
import { User } from './user'

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <main>
      <LoginButton />
      <LogoutButton />
      <h2>Server Session</h2>
      <pre>{JSON.stringify(session)}</pre>
      <h2>Client Call</h2>
      <User />
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
