'use client';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';

const Modal = ({ children }) => {
    const overlay = useRef(null);
    const wrapper = useRef(null);
    const router = useRouter();

    const onDismiss = useCallback(() => {
        router.back();
    }, [router]);

    const onClose = (e) => {
        if (e.target === overlay.current) {
            if (onDismiss) onDismiss();
        }
    };

    const onKeyDown = useCallback(
        (e) => {
            if (e.key === 'Escape') onDismiss();
        },
        [onDismiss]
    );

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [onKeyDown]);
    return (
        <div
            ref={overlay}
            className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/60 p-10"
            onClick={onClose}
        >
            <div
                className="dark:bg-body bg-white font-[Sora] dark:text-white text-dark relative mx-auto px-5 py-10 lg:w-[600px] lg:h-[90vh] rounded-md overflow-y-scroll"
                ref={wrapper}
            >
                <div className="absolute right-1 top-1 ">
                    <button
                        className="cursor-pointer text-xl transition-all"
                        onClick={onDismiss}
                    >
                        ❌
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;
