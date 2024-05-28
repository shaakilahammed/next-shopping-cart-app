'use client';
import Image from 'next/image';
import { useState } from 'react';

const ImageGallery = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(
        images.length > 0 && images[0]
    );
    return (
        <div>
            <div className="h-[500px] flex items-center overflow-hidden">
                <Image
                    src={selectedImage}
                    alt="product"
                    className="w-full"
                    width={600}
                    height={450}
                />
            </div>
            <div className="grid grid-cols-5 gap-4 mt-4">
                {images?.length > 0 &&
                    images?.map((image, index) => (
                        <Image
                            key={index}
                            src={image}
                            onMouseOver={() => setSelectedImage(image)}
                            alt="product image"
                            className={`w-full cursor-pointer border h-[80px] object-cover ${
                                selectedImage === image && 'border-primary'
                            }`}
                            height={80}
                            width={110}
                        />
                    ))}
            </div>
        </div>
    );
};

export default ImageGallery;
