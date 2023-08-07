// @ts-nocheck

import type { NextApiRequest, NextApiResponse } from 'next';
import {
  Prisma,
  PrismaClient,
  PrismaQueryBuilder,
  queryRaw,
} from '@prisma/client';
import { json } from 'stream/consumers';

const prisma = new PrismaClient();

export default async function Usehandle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET': {
      let userTable = 'Donate';
      let result = await prisma.$queryRawUnsafe(
        `SELECT * FROM "Public.${userTable}"`
      );

      return json(result);
      // const allRendezVous = await prisma.donate.findMany({

      //     where: raw`TIME(Donation_time) > '12:00:00'`,

      //   });
      //   return res.status(200).json(allRendezVous);
    }

    default:
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      );
  }
}
