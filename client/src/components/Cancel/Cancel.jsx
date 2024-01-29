import PropTypes from 'prop-types';
import { MdCancel } from 'react-icons/md';
import { CancelBtn } from './Cancel.styled';

export const Cancel = ({ onClickFunc }) => {
    return (
        <CancelBtn onClick={onClickFunc}>
            <MdCancel/>
        </CancelBtn>
    );
}

Cancel.propTypes = {
    onClickFunc: PropTypes.func
}