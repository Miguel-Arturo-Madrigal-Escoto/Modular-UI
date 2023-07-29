import { FC } from 'react';
import { Modal } from 'react-responsive-modal';
import { CompanyFormEdit } from './CompanyFormEdit';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setModalClosedProfile } from '../../app/extra/modalSlice';



export const EditCompanyModal: FC = () => {
    const { openProfileModal: open } = useAppSelector(state => state.modal);
    const dispatch = useAppDispatch();
  
    return (
        <div>
            <Modal open={open} onClose={ () => dispatch(setModalClosedProfile()) } center>
                <CompanyFormEdit option='company' />
            </Modal>
        </div>
    )
}
