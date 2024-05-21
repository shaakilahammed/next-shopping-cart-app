import LoginForm from '@/components/form/LoginForm';
import SocialLogin from '@/components/form/SocialLogin';

const LoginPage = () => {
    return (
        <div className="contain py-16">
            <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
                <h2 className="text-2xl uppercase font-medium mb-1">Login</h2>
                <p className="text-gray-600 mb-6 text-sm">
                    welcome back customer
                </p>
                <LoginForm />

                <SocialLogin fromLogin={true} />
            </div>
        </div>
    );
};

export default LoginPage;
