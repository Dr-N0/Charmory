async function getCharacter(characterId: string) {
    const res = await fetch(
        `http://127.0.0.1:8090/api/collections/characters/records/${characterId}`,
        {
            next: { revalidate: 10 },
        }
    );
    const data = await res.json();
    return data;
}

export default async function CharacterPage({ params }: any) {
    const character = await getCharacter(params.id);

    return (
      <main>
        <h1>Characters/{character.id}</h1>
        <div>
            <h3>{character.title}</h3>
            <h5>{character.content}</h5>
            <p>{character.created}</p>
        </div>
      </main>
    );
}
  