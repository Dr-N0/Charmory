import Link from 'next/link'
import style from '@/app/Home.module.css'
import { getServerSession } from "next-auth"
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { LoginButton, LogoutButton } from '@/app/auth'

export default async function Nav() {
    const session = await getServerSession(authOptions)

    return (
        <nav className={style.nav}>
            <Link href={`/`}>
                <h1>
                    <span className={style.ch}>Ch</span>
                    <span className={style.ar}>ar</span>
                    <span className={style.mory}>mory</span>
                </h1>
            </Link>

            { session ?
                (<>
                    <a href='/characters'>
                        <button>
                            Characters
                        </button>
                    </a>
                    <LogoutButton />
                </>) : <LoginButton />
            }
        </nav>
    );
}