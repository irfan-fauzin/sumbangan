// @ts-nocheck

import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function Usehandle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { order_id, transaction_time } = req.body;

  switch (req.method) {
    case 'POST': {
      try {
        const result = await prisma.donate.update({
          where: { tx_midtrans: order_id },
          data: {
            status: 'paid',
            Donation_date: transaction_time,
          },
        });

        return res.status(200).json(result);
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          // The .code property can be accessed in a type-safe manner
          if (e.code === 'P2002') {
            return res
              .status(409)
              .json({ status: 'error', message: 'Duplicated entry' });
          }
          if (e.code === 'P2025') {
            return res
              .status(410)
              .json({ status: 'error', message: 'Data donate tidak ada' });
          } else {
            console.log(e.code);
          }
        }
        console.log(e.code);

        throw e;
      }
    }
  }
}
