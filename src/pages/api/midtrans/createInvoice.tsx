// @ts-nocheck

import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function Usehandle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { order_id, amount } = req.body;

  switch (req.method) {
    case 'POST': {
      try {
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
          credit_card: {
            secure: true,
          },
        };

        snap.createTransaction(parameter).then((transaction) => {
          // transaction token
          let transactionToken = transaction.token;
          console.log('transactionToken:', transactionToken);

          // transaction redirect url
          const result = transaction.redirect_url;
          console.log('transactionRedirectUrl:', result);

          return res.status(200).json({ status: 'success', message: result });
        });

        // const result = await prisma.donate.create({
        //   data: {
        //     id_donate: { connect: { id: id } },
        //     Amount: nama_mesin,
        //     Mesage: nomer_seri,
        //     Name: kategori,

        //   },
        // })
        // return res.status(201).json(result)
      } catch (e) {
        throw e;
      }
    }
  }
}
