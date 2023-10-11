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
        // Find the class by name
        const selectedClass = await prisma.class.findUnique({
            where: { name: className },
        });

        if (!selectedClass) {
            return NextResponse.json({
                status: 404,
                message: "Class not found",
            });
        }

        // Update the character with the new class data
        const updatedCharacter = await prisma.character.update({
            where: { id: characterId },
            data: {
                class: selectedClass,
            },
        });

        return NextResponse.json({ status: 200 })
    } finally {
        await prisma.$disconnect();
    }
}

// Define the GET route function for classes
export async function GET(request: Request) {
    try {
        // Make a Prisma DB call to fetch the class list
        const classList = await prisma.class.findMany({
            orderBy: {
                name: 'asc',
            },
        });

        // Return the class list as a JSON response
        return NextResponse.json({ status: 200, data: classList });
    } finally {
        // Disconnect from the Prisma client
        await prisma.$disconnect();
    }
}