import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { getServerSession } from "next-auth"
import { ApiError } from 'next/dist/server/api-utils';
import { authOptions } from "@/lib/auth";

import Options from './components/Options'

import style from './Builder.module.css'
import Renderer from './Renderer'

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

export default function Builder() {

    // TODO: On "create character" button press inside of /characters page.
    // Create a dummy character entry inside the db with the "finished" tag set to false (which will send user back to the build page)
    // Lazy load other components separatly outside of dom, and use a counter +1/-1 system to switch between them.
    // Send their data to db on unfocus or page change or +1/-1 change
    
    // Lazy load other poritons of page, normal load top of page

    async function handleSave(e: any) {
        e.preventDefault();
        // const user = await prisma.user.upsert({
        //     where: { email: 'test@test.com' },
        //     update: {},
        //     create: {
        //       email: 'test@test.com',
        //       password: password
        //     }
        //   })
        //   console.log(character)
    }

    return (
        <main className={style.mainContainer}>
            <Renderer />
            <Options />
        </main>
    );
}