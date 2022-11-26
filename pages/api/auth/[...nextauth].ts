import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';
import prisma from '../../../lib/prisma';

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
    providers: [
        GitHubProvider({
            clientId: String(process.env.GITHUB_ID),
            clientSecret: String(process.env.GITHUB_SECRET),
        }),
    ],
    adapter: PrismaAdapter(prisma),
    secret: process.env.SECRET,
};