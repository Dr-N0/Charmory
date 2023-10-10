import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Define the GET route function for backgrounds
export async function GET(request: Request) {
    try {
        // Make a Prisma DB call to fetch the background list
        const equipmentList = await prisma.equipment.findMany({
            orderBy: {
                name: 'asc',
            },
        });

        // Return the background list as a JSON response
        return NextResponse.json({ status: 200, data: equipmentList });
    } finally {
        // Disconnect from the Prisma client
        await prisma.$disconnect();
    }
}