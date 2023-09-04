import Link from 'next/link'
import style from './Characters.module.css'
import { prisma } from '@/lib/prisma'
import CharacterSearchBar from '@/app/components/CharacterSearchBar';
import { getServerSession } from "next-auth"
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

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
            characters: true,
        },
    })
    return user;
}

async function getCharacters(session: any, user: any) {
    const character = await prisma.character.findFirst({
        where: {
            ownerId: session?.user?.id,
            id: user?.character?.id
        },
    })
    return character;
}

export default async function CharactersPage({ session }: any) {
    const user = await getUser(session);
    const characterInfo = await getCharacters(session, user);

    return (
        <div>
            <section className={style.showcase}>
                <div className={style.wrapper}>
                    <div className={style.headerWrapper}>
                        <h1>Characters</h1>
                        <Link href={`/characters/build`}>
                            <button className={style.greenFade}>Create!</button>
                        </Link>
                    </div>
                    {/* <CharacterSearchBar /> */}
                    <div className={style.characterContainer}>
                        {user?.characters?.map((character) => {
                            return <Character 
                                key={character.id} 
                                character={character} 
                                characterInfo={characterInfo}
                            />;
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}

function Character({character}: any) {
    const { id } = character || {};

    return (
        <section className={style.characterBox}>
            <Card character={character} />
            <div className={style.characterOptions}>
                <Link href={`/characters/${id}`}>
                    <button className={style.greenFade}>View</button>
                </Link>
                <Link href={`/characters/edit`}>
                    <button className={style.yellowFade}>Edit</button>
                </Link>
                <Link href={`/characters/delete`}>
                    <button className={style.redFade}>Delete</button>
                </Link>
            </div>
        </section>
    );
}

function Card({character}: any) {
    const { id, name, ownerId } = character || {};
    
    return (
        <div>
            <h2>{name}</h2>
            <div className={style.subInfo}>
                <span>{id}</span>
                <span>{ownerId}</span>
                <span>{ownerId}</span>
            </div>
        </div>
    );
}