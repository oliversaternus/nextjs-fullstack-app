import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    // POST /api/post
    // Required fields in body: title
    // Optional fields in body: content
    if (req.method === 'POST') {
        const { title, content } = req.body;

        const session = await getSession({ req });
        const result = await prisma.post.create({
            data: {
                title: title,
                content: content,
                author: { connect: { email: session?.user?.email || undefined } },
            },
        });
        res.status(200).json(result);
        return;
    } else {
        res.status(405).send('Method Not Allowed');
    }
}