// @ts-nocheck

import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function Usehandle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query;
  const { id, limit } = query;
  switch (req.method) {
    case 'GET': {
      if (id) {
        const paid = await prisma.donate.aggregate({
          where: {
            status: 'paid',
            campaign: {
              every: {
                id: Number(id),
              },
            },
          },

          _sum: {
            Amount: true,
          },
        });
        return res.json(paid);
      } else {
        const paid = await prisma.donate.aggregate({
          where: {
            status: 'paid',
          },

          _sum: {
            Amount: true,
          },
        });
        return res.json(paid);
      }
    }

    default:
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      );
  }
}
