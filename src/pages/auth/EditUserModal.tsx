import { FC } from 'react';
import { Modal } from 'react-responsive-modal';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setModalClosedProfile } from '../../app/extra/modalSlice';
import { UserFormEdit } from './UserFormEdit';



export const EditUserModal: FC = () => {
    const { openProfileModal: open } = useAppSelector(state => state.modal);
    const dispatch = useAppDispatch();
  
    return (
        <div>
            <Modal open={open} onClose={ () => dispatch(setModalClosedProfile()) } center>
                <UserFormEdit option='user' />
            </Modal>
        </div>
    )
}
