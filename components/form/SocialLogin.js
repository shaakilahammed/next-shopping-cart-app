'use client';
import Link from 'next/link';

const SocialLogin = ({ fromLogin = true, texts, locale }) => {
    const handleSocialLogin = async (provider) => {
        try {
            alert(`Login/Register with ${provider} Coming soon...`);
            // await signIn(provider, {
            //     callbackUrl: `${getBaseUrl()}/${locale}/`,
            // });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div className="mt-6 flex justify-center relative">
                <div className="text-gray-600 uppercase px-3 bg-white z-10 relative">
                    {fromLogin ? texts.orLogin : texts.orSignUp}
                </div>
                <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
            </div>
            <div className="mt-4 flex gap-4">
                <button
                    onClick={() => handleSocialLogin('facebook')}
                    className="w-1/2 py-2 text-center text-white bg-blue-800 rounded uppercase font-roboto font-medium text-sm hover:bg-blue-700"
                >
                    {texts.facebook}
                </button>
                <button
                    onClick={() => handleSocialLogin('google')}
                    className="w-1/2 py-2 text-center text-white bg-red-600 rounded uppercase font-roboto font-medium text-sm hover:bg-red-500"
                >
                    {texts.google}
                </button>
            </div>
            {fromLogin ? (
                <p className="mt-4 text-center text-gray-600">
                    {texts.donotHaveAccount}{' '}
                    <Link href={`/${locale}/register`} className="text-primary">
                        {texts.registerNow}
                    </Link>
                </p>
            ) : (
                <p className="mt-4 text-center text-gray-600">
                    {texts.haveAccount}{' '}
                    <Link href={`/${locale}/login`} className="text-primary">
                        {texts.loginNow}
                    </Link>
                </p>
            )}
        </>
    );
};

export default SocialLogin;
