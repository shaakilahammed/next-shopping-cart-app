'use client';
import { getLiveUrl } from '@/utils/utils';
import {
    FacebookIcon,
    FacebookMessengerIcon,
    FacebookMessengerShareButton,
    FacebookShareButton,
    PinterestIcon,
    PinterestShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
} from 'next-share';

const SocialShare = ({ productId }) => {
    console.log(process.env.NEXT_PUBLIC_FACEBOOK_APP_ID);
    return (
        <div className="flex gap-3 mt-4">
            {/* <Link
                href="#"
                className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
            >
                <FontAwesomeIcon icon={faFacebookF} />
            </Link>
            <Link
                href="#"
                className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
            >
                <FontAwesomeIcon icon={faTwitter} />
            </Link>
            <Link
                href="#"
                className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
            >
                <FontAwesomeIcon icon={faInstagram} />
            </Link> */}
            <FacebookShareButton
                url={`${getLiveUrl()}/shop/${productId}?color=664f12f46da3668c1944a255&quantity=1`}
            >
                <FacebookIcon
                    className="hover:scale-110 transition-all"
                    size={24}
                    round
                />
            </FacebookShareButton>

            <FacebookMessengerShareButton
                url={`${getLiveUrl()}/shop/${productId}?color=664f12f46da3668c1944a255&quantity=1`}
                appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}
            >
                <FacebookMessengerIcon
                    className="hover:scale-110 transition-all"
                    size={24}
                    round
                />
            </FacebookMessengerShareButton>

            <WhatsappShareButton url={`${getLiveUrl()}/shop/${productId}`}>
                <WhatsappIcon
                    className="hover:scale-110 transition-all"
                    size={24}
                    round
                />
            </WhatsappShareButton>

            <TwitterShareButton url={`${getLiveUrl()}/shop/${productId}`}>
                <TwitterIcon
                    className="hover:scale-110 transition-all"
                    size={24}
                    round
                />
            </TwitterShareButton>

            <PinterestShareButton url={`${getLiveUrl()}/shop/${productId}`}>
                <PinterestIcon
                    className="hover:scale-110 transition-all"
                    size={24}
                    round
                />
            </PinterestShareButton>
        </div>
    );
};

export default SocialShare;
