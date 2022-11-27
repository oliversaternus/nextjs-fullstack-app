import handlebars from "handlebars";
import nodemailer from "nodemailer";
import { ACCOUNT_VERIFICATION } from "./templates/ACCOUNT_VERIFICATION";
import { LOGIN } from "./templates/LOGIN";
import { TemplateKeys, TemplateProps } from "./types";

const smtpUser = process.env.SMTP_USER;
const smtpPassword = process.env.SMTP_PASSWORD;
const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT;
const smtpEmailAddress = process.env.SMTP_EMAIL_ADDRESS || smtpUser;

const mailTransporter = nodemailer.createTransport({
    auth: {
        pass: String(smtpPassword),
        user: String(smtpUser)
    },
    secure: true,
    host: smtpHost,
    port: Number(smtpPort)
});

const templates: Partial<{ [key in TemplateKeys]: handlebars.TemplateDelegate<TemplateProps[key]> }> = {
    ACCOUNT_VERIFICATION: handlebars.compile(ACCOUNT_VERIFICATION),
    LOGIN: handlebars.compile(LOGIN)
};

export const EmailService = {
    sendEmail: async <TemplateKey extends TemplateKeys>(template: TemplateKey, props: TemplateProps[TemplateKey], subject: string, recipient: string) => {
        try {
            const htmlContent = templates[template]?.(props as any);
            if (!htmlContent) {
                return;
            }
            // TODO: Add text content as fallback
            const sentMessageInfo = await mailTransporter.sendMail({
                from: smtpEmailAddress,
                html: htmlContent,
                subject,
                to: recipient
            });
            return sentMessageInfo;
        } catch (e) {
            console.error(e);
            return undefined;
        }
    }
};