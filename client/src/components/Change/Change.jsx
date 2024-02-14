import { HiPencilAlt } from 'react-icons/hi';
import PropTypes from 'prop-types';
import { ChangeBtn } from './Change.styled';

export const Change = ({ onClickFunc }) => {
    return (
        <ChangeBtn onClick={onClickFunc} className='change'>
            <HiPencilAlt/>
        </ChangeBtn>
    );
}

Change.propTypes = {
    onClickFunc: PropTypes.func
}