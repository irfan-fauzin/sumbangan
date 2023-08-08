// @ts-nocheck

import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

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
      const result = await prisma.campaign.findMany({
        include: {
          user: true,
          donate: {
            where: {
              status: 'paid',
            },
          },
        },
      });
      return res.json(result);
    }

    case 'POST': {
      try {
        const result = await prisma.mesin.create({
          data: {
            nama_mesin: nama_mesin,
            nomer_seri: nomer_seri,
            kategori: kategori,
            status: status,
          },
        });
        return res.status(201).json(result);
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
