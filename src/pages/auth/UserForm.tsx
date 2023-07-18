import { FC } from 'react'
import { SubmitHandler, useForm } from "react-hook-form";
import { IProfile } from "./types/interfaces";
import { useCurrentUser } from './hooks/useCurrentUser';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { onCreateProfile } from '../../app/auth/thunks';
import { FormErrorMessage } from '../../components/auth/FormErrorMessage';
import { useNavigate } from 'react-router-dom';

interface Props {
    option: string
}

export const UserForm: FC<Props> = ({ option }) => {
    const {
        register,
        handleSubmit
    } = useForm<IProfile>()
    
    const { access, errors } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const currentUserQuery = useCurrentUser(access);

    const onSubmit: SubmitHandler<IProfile> = async(formData) => {
        localStorage.setItem('profile', option);

        try {
            await dispatch(onCreateProfile({
                data: {
                    expected_salary: formData.expected_salary,
                    lastname: formData.lastname,
                    location: formData.location,
                    modality: formData.modality,
                    name: formData.name,
                    position: formData.position,
                    about: formData.about,
                    image: formData.image[0] || null,
                    base_user: currentUserQuery.data?.id
                },
                option
            })).unwrap();
            
            navigate('/for-you');

        } catch (error) {
            console.log('error: ', error)       
        }
    }

    
    return (
        <>
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
                                <option value="presencial">Presencial</option>
                                <option value="remoto">Remoto</option>
                                <option value="hibrido">Híbrido</option>
                    </select>
                    {
                        errors.modality && <FormErrorMessage message={errors.modality} />
                    }
                </div>
                <div className="relative">
                    <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Ubicación</label>
                    <input
                    className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
                    type="text" placeholder="Ingresa tu ubicación" {...register('location')}
                    />
                    {
                        errors.location && <FormErrorMessage message={errors.location} />
                    }
                </div>
                <div className="relative">
                    <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Posición</label>
                    <input
                    className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
                    type="text" placeholder="Ingresa tu posición deseada" {...register('position')}
                    />
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

                <div className="relative">
                    <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Foto de perfil (opcional)</label>
                    <input
                        className="w-full text-base px-4 py-2 focus:outline-none rounded-2xl focus:border-indigo-500"
                        type="file" placeholder="Ingresa tu posición deseada" {...register('image')}
                    />
                    {
                        errors.image && <FormErrorMessage message={ errors.image }/>
                    }
                </div>
                        
                <div>
                    <button type="submit"
                    className="w-full flex justify-center bg-gradient-to-r from-indigo-500 to-red-600  hover:bg-gradient-to-l hover:from-red-500 hover:to-indigo-600 text-white p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                    Crear perfil
                    </button>
                </div>
            </form>
        </>
  )
}