// @ts-nocheck

import type { NextApiRequest, NextApiResponse } from 'next';

import * as web3 from '@solana/web3.js';
import * as anchor from '@project-serum/anchor';

import idl from '@/assets/idl.json';

import { mutate } from 'swr';
import { parseJSON } from 'date-fns/esm';

import prisma from '@/lib/prisma';

const a = JSON.stringify(idl);
const parsedidl = JSON.parse(a);

const secret = [
  251, 17, 248, 25, 28, 204, 219, 142, 71, 100, 228, 255, 74, 95, 79, 115, 66,
  44, 71, 114, 57, 48, 217, 180, 117, 201, 212, 83, 196, 28, 76, 192, 10, 184,
  248, 69, 111, 232, 95, 165, 148, 14, 45, 225, 226, 152, 35, 122, 134, 197, 15,
  160, 130, 102, 63, 95, 17, 130, 192, 52, 118, 75, 103, 34,
];
const myKeypair = web3.Keypair.fromSecretKey(new Uint8Array(secret));

const connection = new web3.Connection(web3.clusterApiUrl('devnet'));

const programId = new web3.PublicKey(
  '5oHv28d6bup84dHF4ARf7ZzsbdLhcJmg8iPGzhcnQayM'
);

const wallet = new anchor.Wallet(myKeypair);
const provider = new anchor.AnchorProvider(
  connection,
  new anchor.Wallet(myKeypair),
  {
    commitment: 'processed',
  }
);

const program = new anchor.Program(parsedidl, programId, provider);

export default async function Usehandle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { order_id, transaction_time, payment_type, transaction_status } =
    req.body;

  switch (req.method) {
    case 'POST': {
      if (transaction_status === 'capture' || 'settlement') {
        try {
          const getDetail = await prisma.donate.findMany({
            where: {
              tx_midtrans: order_id,
            },
            include: {
              campaign: true,
            },
          });

          const dateISO = new Date(transaction_time);

          const campaign = getDetail[0].campaign[0].Title;
          const donatur = getDetail[0].Name;
          const amount = getDetail[0].Amount?.toString();
          const midtransPaymentId = order_id;
          const notes =
            getDetail[0].Message === null ? 'None' : getDetail[0].Message;
          const date = dateISO;
          const paymentMethod = payment_type;

          console.log(
            campaign,
            donatur,
            amount,
            midtransPaymentId,
            notes,
            date,
            paymentMethod
          );

          const donateAccount = web3.Keypair.generate();
          const tx = await program.methods
            .donate(
              campaign,
              donatur,
              amount,
              midtransPaymentId,
              notes,
              date,
              paymentMethod
            )
            .accounts({
              donateAccount: donateAccount.publicKey,
              signer: wallet.publicKey,
              systemProgram: web3.SystemProgram.programId,
            })
            .signers([donateAccount])
            .rpc();

          const result = await prisma.donate.updateMany({
            where: {
              tx_midtrans: {
                contains: order_id,
              },
            },

            data: {
              status: 'paid',
              Donation_date: dateISO,
              payment_method: payment_type,
              tx_solana: tx,
            },
          });

          mutate('/api/campaign');

          return res.status(200).json(result);
        } catch (e) {
          throw e;
        }
      }
    }

    default:
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      );
  }
}
