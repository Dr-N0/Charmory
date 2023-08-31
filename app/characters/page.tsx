import Link from 'next/link'
import style from './Characters.module.css'
import Nav from '@/app/components/Nav'
import { prisma } from '@/lib/prisma'
import CharacterSearchBar from '@/app/components/CharacterSearchBar';

async function getCharacters() {
    // const res = await fetch(
    //     'http://127.0.0.1:8090/api/collections/characters/records?page=1&perPage=10',
    //     { cache: 'no-store' }
    // );
    // const data = await res.json();
    // return data?.items as any[];
    const user = await prisma.user.findFirst({
        where: {
            email: 'test@test.com'
        }
    })
    return user;
}

export default async function CharactersPage() {
    const characters = await getCharacters();

    return (
        <main>
            <Nav />
            <section className={style.showcase}>
                <h1>Characters</h1>
                <Link href={`/characters/create`}>
                    <button>Create!</button>
                </Link>
                <CharacterSearchBar />
                <div className={style.characterContainer}>
                    <p>{characters?.name}</p>
                    {/* {characters?.map((character) => {
                        return <Character key={character.id} character={character} />;
                    })} */}
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