// @ts-nocheck

import type { NextApiRequest, NextApiResponse } from 'next';
import { Prisma, PrismaClient } from '@prisma/client';
import { campaignMenuItems } from '@/layouts/sidebar/_menu-items';
import { title } from 'process';

const prisma = new PrismaClient();

export default async function Usehandle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query;

  switch (req.method) {
    case 'GET': {
      const result = await prisma.donate.findMany({
        take: 25,
        orderBy: {
            Donation_date: 'desc',
          },
        include: {
          campaign: {
            select: {
              Title: true,
            },
          },
        },
        where: {
          status: 'paid',
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
