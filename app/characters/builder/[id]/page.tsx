import { prisma } from '@/lib/prisma'
import { getServerSession } from "next-auth"
import { ApiError } from 'next/dist/server/api-utils';
import { authOptions } from "@/lib/auth";
import style from './EditPage.module.css'

// Values we still need
// Inspiration, Defenses vs Conditions

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
          proficencies: true,
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
    <main className={style.mainContainer}>
      <h1>EDIT PAGE DON'T TOUCH</h1>
      <pre>{asdf}</pre>
    </main>
  );
}