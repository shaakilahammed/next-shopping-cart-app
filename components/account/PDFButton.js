'use client';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PDFButton = () => {
    return (
        <div className="w-1/6 text-right">
            <FontAwesomeIcon icon={faPrint} className="cursor-pointer" />
        </div>
    );
};

export default PDFButton;
