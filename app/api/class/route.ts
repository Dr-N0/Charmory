import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
    const { className, characterId } = await request.json();

    if (!className || !characterId) {
        return NextResponse.json({
            status: 405,
            message: "Missing Required Data"
        })
    }

    try {
        const foundClass = await prisma.class.findUnique({
            where: { name: className },
        });

        const foundClassCopy = { ...foundClass };

        const character = await prisma.character.findUnique({
            where: { id: characterId },
        });

        const updatedCharacter = await prisma.character.update({
            where: { id: character?.id },
            data: {
                class: {
                    connect: { id: foundClassCopy.id },
                },
            },
        });

        return NextResponse.json({ status: 200, data: {character: updatedCharacter, foundclass: foundClass} })
    } finally {
        await prisma.$disconnect();
    }
}