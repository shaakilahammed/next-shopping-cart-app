import Copyright from '@/components/ui/Copyright';
import Footer from '@/components/ui/Footer';
import Header from '@/components/ui/Header';
import Navbar from '@/components/ui/Navbar';

export default function RootLayout({ params: { locale }, children }) {
    return (
        <>
            <Header locale={locale} />
            <Navbar locale={locale} />
            {children}
            <Footer locale={locale} />
            <Copyright locale={locale} />
        </>
    );
}
