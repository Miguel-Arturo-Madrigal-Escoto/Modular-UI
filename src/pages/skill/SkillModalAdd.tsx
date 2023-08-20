import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setModalClosedSkill } from "../../app/extra/modalSlice";
import { ISkillAddForm } from "./types/interfaces";
import { TitleForm } from "../auth/TitleForm";
import { onAddUserSkill, onGetUserSkills } from "../../app/Skill/thunks";
import { FormErrorMessage } from "../../components/auth/FormErrorMessage";


export const SkillModalAdd = () => {

    const {
        register,
        handleSubmit,
    } = useForm<ISkillAddForm>();
    const { user_data } = useAppSelector(state => state.auth);
    const { errors } = useAppSelector(state => state.skill);

    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<ISkillAddForm> = async data => {
        try {
            await dispatch(onAddUserSkill({
                name: data.name,
                description: data.description,
                user: user_data!.user!.id

            })).unwrap();
            dispatch(setModalClosedSkill());
            dispatch(onGetUserSkills({ user: user_data!.user!.id }));
        } catch (error) {
            
        }
    }
    
    return (
        <>
            <div className="max-w-md w-full space-y-8">
                <TitleForm title={'Agregar habilidad'}/>
                <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-6">
                        <div className="relative">
                            <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Habilidad</label>
                            <input  className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500" {...register('name')}/>
                            {
                                errors.name && <FormErrorMessage message={ errors.name }/>
                            }
                        </div>
                        <div className="relative">
                            <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Descripción</label>
                            <textarea rows={4} cols={40} className=" w-full text-base px-4 border border-gray-300 focus:outline-none  resize-none focus:border-indigo-500" {...register('description')}/>
                            {
                                errors.description && <FormErrorMessage message={ errors.description }/>
                            }
                        </div>
                    </div>
                    <div className="relative right-0">
                        <button type="submit"
                            className="flex items-center bg-gradient-to-r from-indigo-500 to-red-500  hover:bg-gradient-to-l hover:from-red-600 hover:to-indigo-600 text-white px-4 py-2 rounded text-sm space-x-2 transition duration-100 font-semibold">
                            Añadir
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
