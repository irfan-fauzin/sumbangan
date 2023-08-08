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
      const test = await prisma.donate.aggregate({
        where: {
          status: 'paid',
          campaign: {
            every: {
              user: { username: 'irfan' },
            },
          },
        },

        _sum: {
          Amount: true,
        },
      });

      return res.json(test);
    }
  }
}
