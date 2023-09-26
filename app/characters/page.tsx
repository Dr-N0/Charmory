import Link from 'next/link'
import style from './Characters.module.css'
import { prisma } from '@/lib/prisma'
import CharacterSearchBar from '@/app/_components/CharacterSearchBar';
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth";

export async function getServerSideProps() {
    const session = await getServerSession(authOptions);
  
    return {
      props: {
        session,
      },
    };
  }

async function getUser(session: any) {
    const user = await prisma.user.findFirst({
        where: {
            email: session?.user?.email
        },
        include: {
            characters: {
                orderBy: { createdAt: 'asc' },
                include: {
                    race: true,
                    class: true,
                    abilities: true,
                    description: true,
                    equipment: true,
                }
            },
        },
    })
    return user;
}

export default async function CharactersPage({ session }: any) {
    const user = await getUser(session);

    return (
        <div>
            <section className={style.showcase}>
                <div className={style.wrapper}>
                    <div className={style.headerWrapper}>
                        <h1 className={style.armory}>Armory</h1>
                        <h2>{user?.characters.length} / 10</h2>
                        <Link className='noSelect' href={`/characters/builder`}>
                            <button className={`${style.button} ${style.greenFade}`}>Create!</button>
                        </Link>
                    </div>
                    <div className={style.characterContainer}>
                        {user?.characters?.map((character) => {
                            return <Character 
                                key={character.id} 
                                character={character} 
                            />;
                        })}
                        {user?.characters?.map((character) => {
                            return <Character 
                                key={character.id} 
                                character={character} 
                            />;
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}

function Character({character}: any) {
    return (
        <section className={style.characterBox}>
            <div className={style.cardBox}>
                <h2 className={style.cardName}>{character.name}</h2>
                <div className={style.subInfo}>
                    <span>Level {character.level}</span>
                    <span>{character.race?.name}</span>
                    <span>{character.class?.name}</span>
                </div>
            </div>
            <div className={`${style.characterOptions}`}>
                <Link className='noSelect' href={`/characters/${character.id}`}>
                    <button className={`${style.button} ${style.greenFade}`}>View</button>
                </Link>
                <Link className='noSelect' href={`/characters/builder/${character.id}`}>
                    <button className={`${style.button} ${style.yellowFade}`}>Edit</button>
                </Link>
                <Link className='noSelect' href={`/characters/delete`}>
                    <button className={`${style.button} ${style.redFade}`}>Delete</button>
                </Link>
            </div>
        </section>
    );
}