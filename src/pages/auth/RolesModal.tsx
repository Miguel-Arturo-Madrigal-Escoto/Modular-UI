import { FC } from 'react';
import { Modal } from 'react-responsive-modal';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setModalClosedRoles } from '../../app/extra/modalSlice';
import { RolesModalEdit } from './RolesModalEdit';



export const RolesModal: FC = () => {
    const { openRolesModal } = useAppSelector(state => state.modal);
    const dispatch = useAppDispatch();
  
    return (
        <div>
            <Modal open={ openRolesModal } onClose={ () => dispatch(setModalClosedRoles()) } center>
                <RolesModalEdit />
            </Modal>
        </div>
    )
}
