// @ts-nocheck

import type { NextApiRequest, NextApiResponse } from 'next';

import { json } from 'stream/consumers';

import prisma from '@/lib/prisma';

export default async function Usehandle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET': {
      if (req.query.order_id) {
        const getDetail = await prisma.donate.findMany({
          where: {
            tx_midtrans: order_id,
          },
          include: {
            campaign: true,
          },
        });
        return res.json(getDetail);
      }
    }

    default:
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      );
  }
}
