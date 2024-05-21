import RegisterForm from '@/components/form/RegisterForm';
import SocialLogin from '@/components/form/SocialLogin';

const RegisterPage = () => {
    return (
        <div className="contain py-16">
            <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
                <h2 className="text-2xl uppercase font-medium mb-1">
                    Create an account
                </h2>
                <p className="text-gray-600 mb-6 text-sm">
                    Register for new cosutumer
                </p>
                <RegisterForm />

                <SocialLogin fromLogin={false} />
            </div>
        </div>
    );
};

export default RegisterPage;
