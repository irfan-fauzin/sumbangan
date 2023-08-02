// @ts-nocheck

import type { NextApiRequest, NextApiResponse } from 'next';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function Usehandle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data, id_mesin, nama_mesin, nomer_seri, kategori, status } = req.body;

  switch (req.method) {
    case 'PATCH': {
      try {
        const result = await prisma.mesin.delete({
          where: { id: Number(id_mesin) },
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
              .json({ status: 'error', message: 'Data mesin tidak ada' });
          } else {
            console.log(e.code);
          }
        }
        console.log(e.code);

        throw e;
      }
    }

    case 'PUT': {
      try {
        const result = await prisma.mesin.update({
          where: { id: data.id_mesin },
          data: {
            nama_mesin: data.nama_mesin,
            nomer_seri: data.nomer_seri,
            kategori: data.kategori,
            status: data.status,
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
              .json({ status: 'error', message: 'Data mesin tidak ada' });
          } else {
            console.log(e.code);
          }
        }
        console.log(e.code);

        throw e;
      }
    }

    case 'GET': {
      const result = await prisma.mesin.findMany();
      return res.json(result);
    }

    case 'POST': {
      try {
        const data = {
          transaction_details: {
            order_id: 'concert-ticket-0533',
            gross_amount: 190000,
          },

          usage_limit: 5,
          expiry: {
            duration: 30,
            unit: 'days',
          },
          item_details: [
            {
              id: 'tix-001',
              name: 'Exclusive Tour Concert Day 1',
              price: 95000,
              quantity: 2,
            },
          ],
          customer_details: {
            first_name: 'John',
            last_name: 'Doe',
            email: 'john.doe@example.com',
            phone: '+62181000000000',
            notes:
              'Thank you for your order. Please follow the instructions to complete payment.',
          },
          custom_field1: 'custom field 1 content',
          custom_field2: 'custom field 2 content',
          custom_field3: 'custom field 3 content',
        };

        const response = await fetch(
          'https://api.sandbox.midtrans.com/v1/payment-links',
          {
            method: 'POST',
            mode: 'cors',
            headers: new Headers({
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization:
                'Basic U0ItTWlkLXNlcnZlci1PZXdYNjRCdzJrRndMRU05aGV3S3JIRVU6',
            }),

            body: JSON.stringify(data),
          }
        );

        return response.json();

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
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          // The .code property can be accessed in a type-safe manner
          if (e.code === 'P2002') {
            return res
              .status(409)
              .json({ status: 'error', message: 'Duplicated entry' });
          } else {
            console.log(e.code);
          }
        }
        throw e;
      }
    }

    default:
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      );
  }
}
