import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { email } = req.query;

    try {
      const characters = await prisma.character.findMany({
        where: {
          owner: {
            email: email as string,
          },
        },
      });

      res.status(200).json(characters);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
