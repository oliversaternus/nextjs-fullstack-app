import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import EmailProvider from 'next-auth/providers/email';
import prisma from '../../../lib/prisma';
import { EmailService } from '../../../services/EmailService/service';

const options = {
    providers: [
        EmailProvider({
            sendVerificationRequest({
                identifier: email,
                url,
            }) {
                EmailService.sendEmail('LOGIN', { title: 'Login Link', url }, 'Login Link', email)
            },
        })
    ],
    adapter: PrismaAdapter(prisma),
    secret: process.env.SECRET,
};

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;