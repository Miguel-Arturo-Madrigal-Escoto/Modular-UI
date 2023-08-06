import { FC } from 'react';
import { Modal } from 'react-responsive-modal';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setModalClosedExperience } from '../../app/extra/modalSlice';
import { ExperienceModalAdd } from './ExperienceModalAdd';




export const AddUserExperienceModal: FC = () => {
    const { openExperienceModal: open } = useAppSelector(state => state.modal);
    const dispatch = useAppDispatch();
  
    return (
        <div>
            <Modal open={open} onClose={ () => dispatch(setModalClosedExperience()) } center>
                <ExperienceModalAdd />
            </Modal>
        </div>
    )
}