import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
    const { name, characterId } = await request.json();

    if (!name || !characterId) {
        return NextResponse.json({
            status: 405,
            message: "Missing Required Data"
        })
    }

    try {
        // Update the character with the new name
        const updatedCharacter = await prisma.character.update({
            where: { id: characterId },
            data: {
                name: name,
            },
        });

        return NextResponse.json({ status: 200, data: {character: updatedCharacter} })
    } finally {
        await prisma.$disconnect();
    }
}