// @ts-nocheck

import type { NextApiRequest, NextApiResponse } from 'next';

import { campaignMenuItems } from '@/layouts/sidebar/_menu-items';
import { title } from 'process';

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
            tx_midtrans: req.query.order_id,
          },
          include: {
            campaign: true,
          },
        });
        return res.json(getDetail);
      }

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
