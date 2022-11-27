import handlebars from "handlebars";
import nodemailer from "nodemailer";
import { LOGIN_HTML, LOGIN_TEXT } from "./templates/LOGIN";
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

const templates: Partial<{ [key in TemplateKeys]: {
    html: handlebars.TemplateDelegate<TemplateProps[key]>,
    text: handlebars.TemplateDelegate<TemplateProps[key]>
} }> = {
    LOGIN: {
        html: handlebars.compile(LOGIN_HTML),
        text: handlebars.compile(LOGIN_TEXT)
    }
};

export const EmailService = {
    sendEmail: async <TemplateKey extends TemplateKeys>(template: TemplateKey, props: TemplateProps[TemplateKey], subject: string, recipient: string) => {
        try {
            const htmlContent = templates[template]?.html?.(props as any);
            const textContent = templates[template]?.text?.(props as any);

            if (!htmlContent || !textContent) {
                return;
            }
            const sentMessageInfo = await mailTransporter.sendMail({
                from: smtpEmailAddress,
                html: htmlContent,
                text: textContent,
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