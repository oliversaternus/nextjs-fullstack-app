// These types defines what email templates are available and what data is needed to fill them.

export type TemplateKeys = 'ACCOUNT_VERIFICATION' | 'LOGIN';

export type TemplateProps = {
    ACCOUNT_VERIFICATION: {
        title: string;
        user: string;
        verificationLink: string;
        senderUrl: string;
        senderCompanyAddress: string;
        senderCompanyName: string;
    },
    LOGIN: {
        title: string;
        url: string;
    }
}