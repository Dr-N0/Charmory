import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
    const { race, characterId } = await request.json();
    
    if (!race || !characterId) {
        return NextResponse.json({
            message: "Missing Required Data"
        })
    }

    try {
        const aarakocra = await prisma.race.findUnique({
            where: { name: race },
        });

        const character: any = await prisma.character.findUnique({
            where: { id: characterId },
        });

        const updatedCharacter = await prisma.character.update({
            where: { id: character?.id },
            data: {
                class: {
                connect: { id: aarakocra?.id },
                },
            },
        });

        return NextResponse.json({ status: 200, data: {character: updatedCharacter} })
    } finally {
        await prisma.$disconnect();
    }
}