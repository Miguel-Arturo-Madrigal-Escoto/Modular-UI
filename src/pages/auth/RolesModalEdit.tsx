import { SubmitHandler, useForm } from "react-hook-form";
import { IRolesForm } from "./types/interfaces";
import { TitleForm } from "./TitleForm";
import { CurrentRoles } from "./CurrentRoles";
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addRole, clearRoles } from "../../app/roles/rolesSlice";
import { onAddCompanyRoles, onGetCompanyRoles } from "../../app/roles/thunks";
import { useCurrentUser } from "./hooks/useCurrentUser";
import { setModalClosedRoles } from "../../app/extra/modalSlice";


export const RolesModalEdit = () => {

    const {
        register,
        handleSubmit,
        watch,
        reset
    } = useForm<IRolesForm>();
    const { roles } = useAppSelector(state => state.roles);
    const { access } = useAppSelector(state => state.auth);

    const dispatch = useAppDispatch();

    const currentUserQuery = useCurrentUser(access);
    
    const onSubmit: SubmitHandler<IRolesForm> = async data => {
        try {
            await dispatch(onAddCompanyRoles({
                company_id: currentUserQuery.data!.company!.id,
                roles
            })).unwrap();
            dispatch(setModalClosedRoles());
            dispatch(clearRoles());
            dispatch(onGetCompanyRoles({ company: currentUserQuery.data!.company!.id  }));
        } catch (error) {
            
        }
    }
    
    const onAddRole = () => {
        dispatch(addRole({
            id: uuidv4(),
            link: watch('link'),
            name: watch('name'),
            position: watch('position'),
            description: watch('description'),
        }));
        reset({
            description: '',
            link: '',
            name: '',
            position: 'administrador'
        });
    }

    return (
        <>
            <TitleForm title={'Agregar roles'}/>
            <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-6">
                    <div className="relative">
                        <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Posición</label>
                        <select {...register('position')} defaultValue="administrador" className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500">
                                    <option value="administrador">Administrador</option>
                                    <option value="analista de datos">Analista de datos</option>
                                    <option value="arquitecto">Arquitecto</option>
                                    <option value="auxiliar">Auxiliar</option>
                                    <option value="becario">Becario</option>
                                    <option value="cocinero">Cocinero</option>
                                    <option value="contador">Contador</option>
                                    <option value="desarrollador">Desarrollador</option>
                                    <option value="devops">DevOps</option>
                                    <option value="diseñador">Diseñador</option>
                                    <option value="electricista">Electricista</option>
                                    <option value="enfermero">Enfermero</option>
                                    <option value="fisico">Físico</option>
                                    <option value="ingeniero">Ingeniero</option>
                                    <option value="matematico">Matemático</option>
                                    <option value="medico">Médico</option>
                                    <option value="mesero">Mesero</option>
                                    <option value="musico">Músico</option>
                                    <option value="profesor">Profesor</option>
                                    <option value="tester">Tester</option>
                                    <option value="vendedor">Vendedor</option>
                                    <option value="otro">Otro</option>
                        </select>
                        {/* {
                            errors.position && <FormErrorMessage message={errors.position} />
                        } */}
                    </div>
                    <div className="relative">
                        <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Nombre del puesto</label>
                        <input
                        className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
                        type="text" placeholder="Ingresa el nombre del puesto" {...register('name')}
                        />
                        {/* {
                            errors.name && <FormErrorMessage message={errors.name} />
                        } */}
                    </div>
                    <div className="relative">
                        <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Link al puesto</label>
                        <input
                        className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
                        type="text" placeholder="Ingresa el link de tu empresa" {...register('link')}
                        />
                        {/* {
                            errors.name && <FormErrorMessage message={errors.name} />
                        } */}
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
                    <button type="button" onClick={ onAddRole }
                        className="flex items-center bg-gradient-to-r from-indigo-500 to-red-500  hover:bg-gradient-to-l hover:from-red-600 hover:to-indigo-600 text-white px-4 py-2 rounded text-sm space-x-2 transition duration-100 font-semibold">
                        Añadir
                    </button>
                </div>
                <div className="flex flex-row justify-center items-center">
                    <CurrentRoles />
                </div>
                <div>
                    <button type="submit"
                        className="w-full flex justify-center bg-gradient-to-r from-indigo-500 to-red-600  hover:bg-gradient-to-l hover:from-red-500 hover:to-indigo-600 text-white p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                    Agregar roles
                    </button>
                </div>
            </form>
        </>
    )
}
