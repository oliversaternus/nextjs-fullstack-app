// These types defines what email templates are available and what data is needed to fill them.

export type TemplateKeys = 'LOGIN';

export type TemplateProps = {
    LOGIN: {
        url: string;
    }
}