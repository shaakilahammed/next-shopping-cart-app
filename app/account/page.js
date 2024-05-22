import { auth } from '@/auth';
import BillingAddress from '@/components/account/BillingAddress';
import PersonalProfile from '@/components/account/PersonalProfile';
import ShippingAddress from '@/components/account/ShippingAddress';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { redirect } from 'next/navigation';

const AccountPage = async () => {
    const session = await auth();
    if (!session) {
        redirect('/login');
    }
    return (
        <>
            <Breadcrumb>
                <p className="text-gray-600 font-medium">Account</p>
            </Breadcrumb>
            <div className="container  items-start gap-6 pt-4 pb-16">
                <div className=" grid grid-cols-3 gap-4 mx-auto max-w-5xl">
                    <PersonalProfile />

                    <ShippingAddress />

                    <BillingAddress />
                </div>
            </div>
        </>
    );
};

export default AccountPage;
