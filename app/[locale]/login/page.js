import { auth } from '@/auth';
import LoginForm from '@/components/form/LoginForm';
import SocialLogin from '@/components/form/SocialLogin';
import { getDictionary } from '@/lib/dictionaries';
import { redirect } from 'next/navigation';

const LoginPage = async ({ params: { locale } }) => {
    const session = await auth();
    if (session) {
        redirect(`/${locale}/`);
        return null;
    }
    const dict = await getDictionary(locale);
    return (
        <div className="contain py-16">
            <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
                <h2 className="text-2xl uppercase font-medium mb-1">
                    {dict.login.title}
                </h2>
                <p className="text-gray-600 mb-6 text-sm">
                    {dict.login.message}
                </p>
                <LoginForm locale={locale} texts={dict.login} />

                <SocialLogin
                    fromLogin={true}
                    locale={locale}
                    texts={dict.socialLogin}
                />
            </div>
        </div>
    );
};

export default LoginPage;
