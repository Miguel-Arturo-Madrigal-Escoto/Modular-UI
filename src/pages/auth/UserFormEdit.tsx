import { FC } from 'react'
import { SubmitHandler, useForm } from "react-hook-form";
import { IProfile } from "./types/interfaces";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { onGetCurrentUserData, onUpdateProfile } from '../../app/auth/thunks';
import { FormErrorMessage } from '../../components/auth/FormErrorMessage';
import { setModalClosedProfile } from '../../app/extra/modalSlice';
import { TitleForm } from "./TitleForm";

interface Props {
    option: string
}

export const UserFormEdit: FC<Props> = ({ option }) => {
    const { errors, user_data, access } = useAppSelector(state => state.auth);
    const { modalities, locations, positions } = useAppSelector(state => state.form);
    
    const {
        register,
        handleSubmit
    } = useForm<IProfile>({
        defaultValues: {
            expected_salary: user_data!.user!.expected_salary,
            lastname: user_data!.user!.lastname,
            location: user_data!.user!.location,
            modality: user_data!.user!.modality,
            name: user_data!.user!.name,
            position: user_data!.user!.position,
            about: user_data!.user!.about,
        }
    });
    
    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<IProfile> = async(formData) => {
        try {
            await dispatch(onUpdateProfile({
                data: {
                    expected_salary: formData.expected_salary,
                    lastname: formData.lastname,
                    location: formData.location,
                    modality: formData.modality,
                    name: formData.name,
                    position: formData.position,
                    about: formData.about,
                },
                option,
                id: user_data!.user!.id
            })).unwrap();
            
            dispatch(setModalClosedProfile());
            dispatch(onGetCurrentUserData({ access: access! }));

        } catch (error) {
            console.log('error: ', error)       
        }
    }

    
    return (
        <>
            <div className="max-w-md w-full space-y-8">
                <TitleForm title={'Modificar perfil'}/>
                {/* Formulario */}
                <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
                    <div className="relative">
                        <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Nombre</label>
                        <input
                        className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
                        type="text" placeholder="Ingresa tu nombre" {...register('name')}
                        />
                        {
                            errors.name && <FormErrorMessage message={errors.name} />
                        }
                    </div>
                    <div className="relative">
                        <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Apellido</label>
                        <input
                        className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
                        type="text" placeholder="Ingresa tu apellido" {...register('lastname')}
                        />
                        {
                            errors.lastname && <FormErrorMessage message={errors.lastname} />
                        }
                    </div>
                    <div className="relative">
                        <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Modalidad</label>
                        <select {...register('modality')} defaultValue="presencial" className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500">
                        {
                            modalities.map((modality, idx) => (
                                <option value={ modality.value } key={ idx }>{ modality.display}</option>
                            ))
                        }
                        </select>
                        {
                            errors.modality && <FormErrorMessage message={errors.modality} />
                        }
                    </div>
                    <div className="relative">
                        <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Ubicación</label>
                        <select {...register('location')} defaultValue="aguascalientes" className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500">
                        {
                            locations.map((location, idx) => (
                                <option value={ location.value } key={ idx }>{ location.display}</option>
                            ))
                        }
                        </select>
                        {
                            errors.location && <FormErrorMessage message={errors.location} />
                        }
                    </div>
                    <div className="relative">
                        <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Posición</label>
                        <select {...register('position')} defaultValue="administrador" className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500">
                        {
                            positions.map((position, idx) => (
                                <option value={ position.value } key={ idx }>{ position.display}</option>
                            ))
                        }
                        </select>
                        {
                            errors.position && <FormErrorMessage message={errors.position} />
                        }
                    </div>
                    <div className="relative">
                        <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Rango salarial</label>
                        <input
                        className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
                        type="number" placeholder="Ingresa el salario esperado" {...register('expected_salary')}
                        />
                        {
                            errors.expected_salary && <FormErrorMessage message={ errors.expected_salary }/>
                        }
                    </div>
                    <div className="relative">
                        <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Acerca de mí</label>
                        <textarea rows={4} cols={40} className=" w-full text-base px-4 py-2 border border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500" {...register('about')}/>
                        {
                            errors.about && <FormErrorMessage message={ errors.about }/>
                        }
                    </div>
                        
                    <div>
                        <button type="submit"
                        className="w-full flex justify-center bg-gradient-to-r from-indigo-500 to-red-600  hover:bg-gradient-to-l hover:from-red-500 hover:to-indigo-600 text-white p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                        Actualizar perfil
                        </button>
                    </div>
                </form>
            </div>
        </>
  )
}