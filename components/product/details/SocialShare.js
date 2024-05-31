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
            <FacebookShareButton url={`${getLiveUrl()}/shop/${productId}`}>
                <FacebookIcon
                    className="hover:scale-110 transition-all"
                    size={24}
                    round
                />
            </FacebookShareButton>

            <FacebookMessengerShareButton
                url={`${getLiveUrl()}/shop/${productId}`}
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
