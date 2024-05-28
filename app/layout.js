import AuthProvider from '@/providers/AuthProvider';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Inter } from 'next/font/google';
import './globals.css';
config.autoAddCss = false;
// TODO: Change font
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'LWSkart - Home',
    description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthProvider>{children}</AuthProvider>
                <script
                    src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"
                    defer
                />
            </body>
        </html>
    );
}
