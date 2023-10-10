import Link from 'next/link'
import style from '@/app/Home.module.css'
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth";
import { LoginButton, LogoutButton } from '@/app/auth'
import { CharacterLink } from '@/app/_components/CharacterLink'

export default async function Nav() {
    const session = await getServerSession(authOptions);

    return (
        <nav className={`${style.nav}`}>
            <div>
                <Link href={`/`} className={style.logo} prefetch={true}>
                    <h1>
                        <span className={style.ch}>Ch</span>
                        <span className={style.ar}>ar</span>
                        <span className={style.mory}>mory</span>
                    </h1>
                </Link>
            </div>

            { session ?
                (<>
                    <CharacterLink />
                    <LogoutButton />
                </>) : <LoginButton />
            }
        </nav>
    );
}