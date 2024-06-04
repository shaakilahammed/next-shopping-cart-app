import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PDFButton = () => {
    return (
        <div className="flex justify-end items-center gap-2 hover:text-primary cursor-pointer">
            <span>Print</span>
            <FontAwesomeIcon icon={faPrint} className="cursor-pointer" />
        </div>
    );
};

export default PDFButton;
