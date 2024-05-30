import RegisterForm from '@/components/form/RegisterForm';
import SocialLogin from '@/components/form/SocialLogin';
import { getDictionary } from '@/lib/dictionaries';

const RegisterPage = async ({ params: { locale } }) => {
    const dict = await getDictionary(locale);

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
