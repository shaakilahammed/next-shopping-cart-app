import { getMyProfile } from '@/actions/auth';
import { auth } from '@/auth';
import BillingAddress from '@/components/account/BillingAddress';
import PersonalProfile from '@/components/account/PersonalProfile';
import ShippingAddress from '@/components/account/ShippingAddress';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { getDictionary } from '@/lib/dictionaries';
import Link from 'next/link';
import { redirect } from 'next/navigation';
export const metadata = {
    title: 'NXTkart - Account',
};
const AccountPage = async ({ params: { locale } }) => {
    const dict = await getDictionary(locale);

    const session = await auth();
    if (!session) {
        redirect(`/${locale}/login`);
        return null;
    }
    const profile = await getMyProfile(session?.tokens?.accessToken);
    return (
        <>
            <Breadcrumb>
                <p className="text-gray-600 font-medium">Account</p>
            </Breadcrumb>
            <div className="container items-start gap-6 pt-4 pb-16">
                <div className="flex justify-end">
                    <Link
                        className="py-1 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium"
                        href={`/${locale}/orders`}
                    >
                        View all orders
                    </Link>
                </div>
                <div className="grid grid-cols-3 gap-4 mx-auto max-w-5xl">
                    <PersonalProfile
                        texts={dict.account}
                        profile={profile}
                        locale={locale}
                    />

                    <ShippingAddress
                        texts={dict.account}
                        address={profile?.shippingAddress}
                        locale={locale}
                    />

                    <BillingAddress
                        texts={dict.account}
                        address={profile?.billingAddress}
                        locale={locale}
                    />
                </div>
            </div>
        </>
    );
};

export default AccountPage;
