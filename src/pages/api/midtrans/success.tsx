// @ts-nocheck

import type { NextApiRequest, NextApiResponse } from 'next';
import { Prisma, PrismaClient } from '@prisma/client';
import { campaignMenuItems } from '@/layouts/sidebar/_menu-items';

const prisma = new PrismaClient();
import { mutate } from 'swr';

export default async function Usehandle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { order_id, transaction_time } = req.body;
  const date = new Date(transaction_time);

  switch (req.method) {
    case 'POST': {
      try {
        const result = await prisma.donate.updateMany({
          where: {
            tx_midtrans: {
              contains: order_id,
            },
          },

          data: {
            status: 'paid',
            Donation_date: date,
          },
        });

        mutate('/api/campaign');

        return res.status(200).json(result);
      } catch (e) {
        throw e;
      }
    }

    default:
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      );
  }
}
