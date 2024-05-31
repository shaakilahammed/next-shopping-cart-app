import { auth } from '@/auth';
import RegisterForm from '@/components/form/RegisterForm';
import SocialLogin from '@/components/form/SocialLogin';
import { getDictionary } from '@/lib/dictionaries';
import { redirect } from 'next/navigation';
export const metadata = {
    title: 'LWSkart - Register',
};
const RegisterPage = async ({ params: { locale } }) => {
    const dict = await getDictionary(locale);
    const session = await auth();
    if (session) {
        redirect(`/${locale}/`);
        return null;
    }
    return (
        <div className="contain py-16">
            <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
                <h2 className="text-2xl uppercase font-medium mb-1">
                    {dict.register.title}
                </h2>
                <p className="text-gray-600 mb-6 text-sm">
                    {dict.register.message}
                </p>
                <RegisterForm texts={dict.register} locale={locale} />

                <SocialLogin
                    fromLogin={false}
                    texts={dict.socialLogin}
                    locale={locale}
                />
            </div>
        </div>
    );
};

export default RegisterPage;
