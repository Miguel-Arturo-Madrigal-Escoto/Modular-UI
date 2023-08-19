import { FC } from 'react';
import { Modal } from 'react-responsive-modal';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setModalClosedSkill } from '../../app/extra/modalSlice';
import { SkillModalAdd } from './SkillModalAdd';




export const AddUserSkillModal: FC = () => {
    const { openSkillModal: open } = useAppSelector(state => state.modal);
    const dispatch = useAppDispatch();
  
    return (
        <div>
            <Modal open={open} onClose={ () => dispatch(setModalClosedSkill()) } center>
                <SkillModalAdd />
            </Modal>
        </div>
    )
}