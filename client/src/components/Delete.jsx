import { BsTrash3Fill } from "react-icons/bs";
import PropTypes from 'prop-types';

export const Delete = ({ onClickFunc }) => {
    return (
        <button className="delete" onClick={onClickFunc}>
            <BsTrash3Fill/>
        </button>
    );
}

Delete.propTypes = {
    onClickFunc: PropTypes.func
}