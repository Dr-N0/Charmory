import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
    const { background, characterId } = await request.json();

    if (!background || !characterId) {
        return NextResponse.json({
            status: 405,
            message: "Missing Required Data",
        });
    }

    try {
        // Find the background by name
        const selectedBackground = await prisma.background.findUnique({
            where: { name: background },
        });
        
        if (!selectedBackground) {
            return NextResponse.json({
                status: 404,
                message: "Background not found",
            });
        }

        // Update the character with the new background data
        const updatedCharacter = await prisma.character.update({
            where: { id: characterId },
            data: {
                description: selectedBackground,
            },
        });

        return NextResponse.json({ status: 200, data: { character: updatedCharacter } });
    } finally {
        await prisma.$disconnect();
    }
}

// Define the GET route function for backgrounds
export async function GET(request: Request) {
    try {
        // Make a Prisma DB call to fetch the background list
        const backgroundList = await prisma.background.findMany({
            orderBy: {
                name: 'asc',
            },
        });

        // Return the background list as a JSON response
        return NextResponse.json({ status: 200, data: backgroundList });
    } finally {
        // Disconnect from the Prisma client
        await prisma.$disconnect();
    }
}