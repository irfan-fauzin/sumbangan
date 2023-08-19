// @ts-nocheck

import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function Usehandle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET': {
      const result = await prisma.campaign.findMany({
        include: {
          user: true,
          donate: {
            where: {
              status: 'paid',
            },
          },
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
