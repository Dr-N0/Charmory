// Import necessary modules
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Define the POST route function
export async function POST(request: Request) {
    try {
        // Parse the request JSON
        const { abilityValue, characterId } = await request.json();
        // Check if required data is missing
        if (!abilityValue || !characterId) {
            return NextResponse.json({
                status: 405,
                message: "Missing Required Data",
            });
        }

        // Destructure abilityValue object
        const { type, value } = abilityValue;

        // Ensure value is within valid range (1 to 18)
        const sanitizedValue = Math.max(1, Math.min(18, value));

        // Update the character with the new ability value
        const updatedCharacter = await prisma.character.update({
            where: { id: characterId },
            data: {
                abilities: {
                    // Assuming abilities is an object field in the character model
                    // Replace this with your actual structure
                    ...{ [type]: sanitizedValue },
                },
            },
        });

        return NextResponse.json({ status: 200 });
    } finally {
        // Disconnect from the Prisma client
        await prisma.$disconnect();
    }
}
