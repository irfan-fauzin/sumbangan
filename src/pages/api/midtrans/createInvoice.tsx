// @ts-nocheck

import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function Usehandle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { order_id, amount, id_campaign, name_campaign, name, email, message } =
    req.body;

  switch (req.method) {
    case 'POST': {
      try {
        await prisma.campaign.update({
          where: {
            id: Number(id_campaign),
          },
          data: {
            donate: {
              create: {
                Amount: amount,
                Message: message ? message : undefined,
                email: email ? email : undefined,
                Name: name ? name : 'Orang Baik',
                tx_midtrans: order_id,
              },
            },
          },
        });

        const midtransClient = require('midtrans-client');

        // Create Snap API instance
        let snap = new midtransClient.Snap({
          isProduction: false,
          serverKey: 'SB-Mid-server-OewX64Bw2kFwLEM9hewKrHEU',
          clientKey: 'SB-Mid-client-hNKmL7okCvqzNHUv',
        });

        let parameter = {
          transaction_details: {
            order_id: order_id,
            gross_amount: amount,
          },

          customer_details: {
            first_name: name ? name : 'Orang Baik',
            email: email ? email : undefined,
            notes: message ? message : undefined,
          },
          id_campaign: id_campaign,
          name_campaign: name_campaign,
        };

        snap.createTransaction(parameter).then((transaction) => {
          const url = transaction.redirect_url;
          const test = transaction.transaction_id;
          return res.status(201).json({ message: url });
        });
      } catch (e) {
        throw e;
      }
    }
  }
}
