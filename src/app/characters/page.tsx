import Link from 'next/link'
import CreateCharacter from '../../components/CreateCharacter';

async function getCharacters() {
    const res = await fetch(
        'http://127.0.0.1:8090/api/collections/characters/records?page=1&perPage=10',
        {cache: 'no-store'}
    );
    const data = await res.json();
    return data?.items as any[];
}

export default async function CharactersPage() {
    const characters = await getCharacters();

    return (
        <div>
            <h1>Characters</h1>
            {characters?.map((character) => {
                return <Character key={character.id} character={character} />;
            })}

            <CreateCharacter />
        </div>
    );
}
  
function Character({character}: any){
    const {id, title, content, created } = character || {};
    return (
        <Link href={`/characters/${id}`}>
            <div>
                <h2>{title}</h2>
                <h5>{content}</h5>
                <p>{created}</p>
            </div>
        </Link>
    );
}