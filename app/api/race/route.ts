import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
    const { race, variant, characterId } = await request.json();
    
    if ((!race && !variant) || !characterId) {
        return NextResponse.json({
            status: 405,
            message: "Missing Required Data"
        })
    }

    try {
        // Find the race by name
        var selectedRace = await prisma.race.findUnique({
            where: { name: race },
        });

        if (!selectedRace) {
            return NextResponse.json({
                status: 404,
                message: "Race not found",
            });
        }

        if (variant) {
            let varList: any = selectedRace.variants;
            const matchingVariant = varList.find((iter: any) => iter.name === variant);

            if (matchingVariant) {
                selectedRace.name = matchingVariant.name;
                selectedRace.color = matchingVariant.color;
                selectedRace.description = matchingVariant.description;
                selectedRace.keywords = matchingVariant.keywords;
                varList = [];
            }
        }
        

        // Update the character with the new race
        const updatedCharacter = await prisma.character.update({
            where: { id: characterId },
            data: {
                race: selectedRace
            },
        });

        return NextResponse.json({ status: 200 })
    } finally {
        await prisma.$disconnect();
    }
}

export async function GET(request: Request) {
    try {
        // Make a Prisma DB call to fetch the race list
        const raceList = await prisma.race.findMany({
            orderBy: {
                name: 'asc',
            },
        });

        // Return the race list as a JSON response
        return NextResponse.json({ status: 200, data: raceList });
    } finally {
        // Disconnect from the Prisma client
        await prisma.$disconnect();
    }
}