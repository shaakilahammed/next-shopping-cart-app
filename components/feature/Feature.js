import Image from 'next/image';

const Feature = ({ title, description, imageUrl }) => {
    return (
        <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
            <Image
                src={imageUrl}
                alt={title}
                className="w-12 h-12 object-contain"
                height={48}
                width={48}
            />
            <div>
                <h4 className="font-medium capitalize text-lg">{title}</h4>
                <p className="text-gray-500 text-sm">{description}</p>
            </div>
        </div>
    );
};

export default Feature;
