import Image from 'next/image';
import Link from 'next/link';

const ExclusiveOffer = ({ imageUrl, link }) => {
    return (
        <div className="container pb-16">
            <Link href={link}>
                <Image
                    src={imageUrl}
                    alt="ads"
                    className="w-full"
                    width={1200}
                    height={300}
                />
            </Link>
        </div>
    );
};

export default ExclusiveOffer;
