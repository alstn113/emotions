import prisma from '~/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    body: { title, content },
  } = req;

  if (method === 'GET') {
    const posts = await prisma.post.findMany({});
    return res.status(200).json(posts);
  }

  if (method == 'POST') {
    const post = await prisma.post.create({
      data: {
        title,
        content,
      },
    });
    return res.status(201).json(post);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${method} Not Allowed`);
};

export default handler;
