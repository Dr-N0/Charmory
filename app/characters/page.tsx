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

async function getCharacters(session: any) {
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

export default async function CharactersPage({ session }: any) {
    const characters = await getCharacters(session);
    console.log(characters)
    return (
        <main>
            <section className={style.showcase}>
                <h1>Characters</h1>
                <Link href={`/characters/build`}>
                    <button>Create!</button>
                </Link>
                <CharacterSearchBar />
                <div className={style.characterContainer}>
                    {characters?.characters?.map((character) => {
                        return <Character key={character.id} character={character} />;
                    })}
                </div>
            </section>
        </main>
    );
}

function Character({character}: any){
    const {id, title, content, created } = character || {};
    return (
        <section className={style.characterBox}>
            <h2>{title}</h2>
            <p>Subtitle</p>
            <h5>{content}</h5>
            <p>{created}</p>
            <div className={style.characterOptions}>
                <Link href={`/characters/${id}`}>
                    <button>View</button>
                </Link>
                <Link href={`/characters/edit`}>
                    <button>Edit</button>
                </Link>
                <Link href={`/characters/copy`}>
                    <button>Copy</button>
                </Link>
                <Link href={`/characters/delete`}>
                    <button>Delete</button>
                </Link>
            </div>
        </section>
    );
}