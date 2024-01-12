import { IoIosCheckmarkCircle } from "react-icons/io";
import PropTypes from 'prop-types';

export const Ok = ({ onClickFunc }) => {
    return (
        <button onClick={onClickFunc} className="ok">
            <IoIosCheckmarkCircle/>
        </button>
    );
}

Ok.propTypes = {
    onClickFunc: PropTypes.func
}