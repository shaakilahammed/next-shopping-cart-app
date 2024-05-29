import { getMyProfile } from '@/actions/auth';
import { auth } from '@/auth';
import AddressForm from '@/components/form/AddressForm';
import Modal from '@/components/modal/Modal';
import { getDictionary } from '@/lib/dictionaries';
import { redirect } from 'next/navigation';

const ShippingAddressModal = async ({ params: { locale, type } }) => {
    const dict = await getDictionary(locale);
    const session = await auth();
    if (!session) {
        redirect('/login');
    }
    const profile = await getMyProfile(session?.tokens?.accessToken);
    const decodedType = decodeURI(type);
    return (
        <Modal>
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
        </Modal>
    );
};

export default ShippingAddressModal;
