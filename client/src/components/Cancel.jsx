import PropTypes from 'prop-types';
import { MdCancel } from "react-icons/md";

export const Cancel = ({ onClickFunc }) => {
    return (
        <button className='cancel' onClick={onClickFunc}>
            <MdCancel/>
        </button>
    );
}

Cancel.propTypes = {
    onClickFunc: PropTypes.func
}