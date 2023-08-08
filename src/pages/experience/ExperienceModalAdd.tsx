import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setModalClosedExperience } from "../../app/extra/modalSlice";
import { IExperienceAddForm } from "./types/interfaces";
import { TitleForm } from "../auth/TitleForm";
import { onAddUserExperience, onGetUserExperiences } from "../../app/experience/thunks";


export const ExperienceModalAdd = () => {

    const {
        register,
        handleSubmit,
    } = useForm<IExperienceAddForm>();
    const { user_data } = useAppSelector(state => state.auth);
    const { positions } = useAppSelector(state => state.form);

    const dispatch = useAppDispatch();

    console.log(user_data)

    
    const onSubmit: SubmitHandler<IExperienceAddForm> = async data => {
        try {
            await dispatch(onAddUserExperience({
                description: data.description,
                end_date: data.end_date,
                start_date: data.start_date,
                role: Number(data.role),
                user: user_data!.user!.id
            })).unwrap();
            dispatch(setModalClosedExperience());
            dispatch(onGetUserExperiences({ user: user_data!.user!.id }));
        } catch (error) {
            
        }
    }
    
    return (
        <>
            <div className="max-w-md w-full space-y-8">
                <TitleForm title={'Agregar experiencia'}/>
                <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-6">
                        <div className="relative">
                            <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Fecha de inicio</label>
                            <input
                                className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
                                type="date" placeholder="Ingresa el nombre del puesto" {...register('start_date')}
                            />
                            {/* {
                                errors.name && <FormErrorMessage message={errors.name} />
                            } */}
                        </div>
                        <div className="relative">
                            <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Fecha de finalizacion</label>
                            <input
                                className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
                                type="date" placeholder="Ingresa el link de tu empresa" {...register('end_date')}
                            />
                            {/* {
                                errors.name && <FormErrorMessage message={errors.name} />
                            } */}
                        </div>
                        <div className="relative">
                            <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Rol</label>
                            <select {...register('role')} defaultValue="presencial" className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500">
                            {
                                positions.map((position, idx) => (
                                    <option value={ position.id } key={ idx }>{ position.display }</option>
                                ))
                            }
                            </select>
                        </div>
                        <div className="relative">
                            <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Descripción</label>
                            <textarea rows={4} cols={40} className=" w-full text-base px-4 border border-gray-300 focus:outline-none  resize-none focus:border-indigo-500" {...register('description')}/>
                            {/* {
                                errors.description && <FormErrorMessage message={ errors.description }/>
                            } */}
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
