import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import EmailProvider from 'next-auth/providers/email';
import prisma from '../../../lib/prisma';
import { EmailService } from '../../../services/EmailService/service';

const options = {
    providers: [
        EmailProvider({
            async sendVerificationRequest({
                identifier: email,
                url,
            }) {
                const result = await EmailService.sendEmail('LOGIN', { url }, 'Anmelden bei buenatoura', email);
                if (!result) {
                    throw new Error(`Email to ${email} could not be sent`);
                }
                const failed = result.rejected.concat(result.pending).filter(Boolean)
                if (failed.length) {
                    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`)
                }
            },
        })
    ],
    adapter: PrismaAdapter(prisma),
    secret: process.env.SECRET,
};

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;