import { removeExpiredCartItems } from '@/actions/cart';
import { auth } from '@/auth';
import AuthProvider from '@/providers/AuthProvider';
import { getLiveUrl } from '@/utils/utils';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Inter } from 'next/font/google';
import './globals.css';
config.autoAddCss = false;
// TODO: Change font
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'NXTkart - Home',
    description:
        'Unleash the magic of interior design with our captivating home décor collection. Elevate your space with irresistible accents that redefine chic and elegance. Make every corner a statement of your unique style.',
    openGraph: {
        images: [`${getLiveUrl()}/assets/images/banner-bg.jpg`],
    },
};

export default async function RootLayout({ children }) {
    const session = await auth();
    await removeExpiredCartItems();
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthProvider session={session}>{children}</AuthProvider>

                <script
                    src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"
                    defer
                />
            </body>
        </html>
    );
}
