// @ts-nocheck

import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

import * as web3 from '@solana/web3.js';
import * as anchor from '@project-serum/anchor';

import idl from '@/assets/idl.json';

import { mutate } from 'swr';

const a = JSON.stringify(idl);
const parsedidl = JSON.parse(a);

const myKeypair = web3.Keypair.fromSecretKey(
  new Uint8Array(JSON.parse(process.env.keypair))
);

const connection = new web3.Connection(web3.clusterApiUrl('devnet'));

const programId = new web3.PublicKey(
  'DxFqiZrrtGpGTpWod54Gop9fZvEu95zBBf32kWTvLjdu'
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
  switch (req.method) {
    case 'GET': {
      const postAccounts = await program.account.donateAccount.all();

      return res.json(postAccounts);
    }

    default:
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      );
  }
}
