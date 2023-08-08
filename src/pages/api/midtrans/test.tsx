// @ts-nocheck

import type { NextApiRequest, NextApiResponse } from 'next';
import { Prisma, PrismaClient } from '@prisma/client';
import { json } from 'stream/consumers';

const prisma = new PrismaClient();

export default async function Usehandle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query;
  const { id, limit } = query;
  switch (req.method) {
    case 'GET': {
      const result = await prisma.donate.findMany({
        where: {
          tx_midtrans: 'Masjid-Satu-Sat-1691405768539',
        },
        include: {
          campaign: true,
        },
      });

      return res.json(result);
    }

    default:
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      );
  }
}
