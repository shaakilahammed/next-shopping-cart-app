import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { NextResponse } from 'next/server';

const locales = ['en', 'bn'];
const defaultLocale = 'en';

const getLocale = (request) => {
    const acceptedLang = request.headers.get('accept-language') || undefined;
    const headers = { 'accept-language': acceptedLang };
    const languages = new Negotiator({ headers }).languages();
    return match(languages, locales, defaultLocale);
};

export const middleware = (request) => {
    const pathname = request.nextUrl.pathname;

    const isMissingLocale = locales.every(
        (locale) =>
            !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    if (!isMissingLocale) {
        return NextResponse.next();
    } else {
        const preferredLocale = getLocale(request);
        request.nextUrl.pathname = `/${preferredLocale}${pathname}`;
        return NextResponse.redirect(request.nextUrl);
    }
};

export const config = {
    matcher: [
        // Skip /_next/, /assets/
        // '/((?!_next|api|assets|/).*)',
        '/((?!api|assets|.*\\..*|_next).*)',
    ],
};
