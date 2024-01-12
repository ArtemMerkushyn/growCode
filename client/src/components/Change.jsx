import { HiPencilAlt } from "react-icons/hi";
import PropTypes from 'prop-types';

export const Change = ({ onClickFunc }) => {
    return (
        <button onClick={onClickFunc} className='change'>
            <HiPencilAlt/>
        </button>
    );
}

Change.propTypes = {
    onClickFunc: PropTypes.func
}