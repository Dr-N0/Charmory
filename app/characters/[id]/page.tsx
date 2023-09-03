import { ApiError } from 'next/dist/server/api-utils';
import { prisma } from '@/lib/prisma'
import { getServerSession } from "next-auth"
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Character } from '@/lib/interface'

export async function getServerSideProps() {
    const session = await getServerSession(authOptions);
  
    return {
      props: {
        session,
      },
    };
  }

async function getCharacters(params: any, session: any) {
    const character = await prisma.character.findFirst({
        where: {
            ownerId: session?.user?.id,
            id: params.id
        },
        include: {
          race: true,
          class: true,
          abilities: true,
          description: true,
          equipment: true,
        }
    })
    if (!character) {
      throw new ApiError(403, 'Character not found');
    }
    return character;
}

export default async function CharacterPage({ params, session }: any) {
  const characterInfo = await getCharacters(params, session);

  let asdf = JSON.stringify(characterInfo, null, '\t');

    return (
      <main>
        <h1>Characters/{characterInfo?.id}</h1>
        <div>
            <pre>{asdf}</pre>
        </div>
      </main>
    );
}