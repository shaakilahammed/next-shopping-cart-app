import { getMyProfile } from '@/actions/auth';
import { auth } from '@/auth';
import AddressForm from '@/components/form/AddressForm';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { getDictionary } from '@/lib/dictionaries';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { redirect } from 'next/navigation';

const AddressPage = async ({ params: { locale, type } }) => {
    const dict = await getDictionary(locale);
    const session = await auth();
    if (!session) {
        redirect('/login');
    }
    const profile = await getMyProfile(session?.tokens?.accessToken);
    const decodedType = decodeURI(type);

    return (
        <>
            <Breadcrumb>
                <p className="text-gray-600 font-medium">Account</p>
                <span className="text-sm text-gray-400">
                    <FontAwesomeIcon icon={faChevronRight} />
                </span>
                <p className="text-gray-600 font-medium">{decodedType}</p>
            </Breadcrumb>
            <div className="contain py-4">
                <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
                    <h2 className="text-2xl uppercase font-medium mb-1">
                        {dict.account.shippingAddress}
                    </h2>

                    <AddressForm
                        texts={dict.account.address}
                        type={decodedType}
                        accessToken={session?.tokens?.accessToken}
                        address={
                            decodedType === 'Shipping Address'
                                ? profile?.shippingAddress
                                : profile?.billingAddress
                        }
                    />
                </div>
            </div>
        </>
    );
};

export default AddressPage;
