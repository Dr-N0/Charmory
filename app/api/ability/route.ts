// Import necessary modules
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Define the POST route function
export async function POST(request: Request) {
    try {
        // Parse the request JSON
        const { currentAbilities, characterId } = await request.json();

        // Check if required data is missing
        if (!currentAbilities || !characterId) {
            return NextResponse.json({
                status: 405,
                message: "Missing Required Data",
            });
        }

        // Update the character with the new ability value
        const updatedCharacter = await prisma.character.update({
            where: { id: characterId },
            data: {
                abilities: {
                    currentAbilities
                },
            },
        });

        console.log(updatedCharacter)

        return NextResponse.json({ status: 200 });
    } finally {
        // Disconnect from the Prisma client
        await prisma.$disconnect();
    }
}
