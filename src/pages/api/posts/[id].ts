import prisma from '~/libs/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Prisma } from '@prisma/client';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    query: { id },
  } = req;

  if (method === 'GET') {
    const post = await prisma.post.findUnique({
      where: {
        id: id as string,
      },
    });
    if (!post) res.status(404).json({ message: 'Post not found' });
    return res.status(200).json(post);
  }

  if (method === 'DELETE') {
    try {
      const post = await prisma.post.delete({
        where: {
          id: id as string,
        },
      });
      return res.json(post);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        return res.status(404).json({ message: 'Post not found' });
      }
    }
  }

  res.setHeader('Allow', ['GET', 'DELETE']);
  res.status(405).end(`Method ${method} Not Allowed`);
};

export default handler;
