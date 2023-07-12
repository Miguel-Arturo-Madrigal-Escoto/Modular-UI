import { FC } from 'react'
import { SubmitHandler, useForm } from "react-hook-form";
import { IProfile } from "./types/interfaces";
import { createProfile } from './hooks/useCreateProfile';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from './hooks/useCurrentUser';
import { useAppSelector } from '../../app/hooks';

interface Props {
    option: 'user' | 'company'
}

export const UserForm: FC<Props> = ({ option }) => {
    const {
        register,
        handleSubmit
      } = useForm<IProfile>()
    const navigate = useNavigate();
    const { access } = useAppSelector(state => state.auth);

    const currentUserQuery = useCurrentUser(access);

    const onSubmit: SubmitHandler<IProfile> = data => {
        try {
            createProfile(option, {
                ...data,
                base_user: currentUserQuery.data?.id
            });
            alert('Perfil creado con éxito');
            navigate('/for-you', {
                replace: true
            });
        } catch (error) {
            // Todo: mostrar alerta de no pudo crear perfil
            console.log(error);
        }
    }

    
    return (
        <>
            {/* Formulario */}
            <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center justify-between">
                    <div className="relative">
                        <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Nombre</label>
                        <input
                        className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
                        type="text" placeholder="Ingresa tu nombre" {...register('name')}
                        />
                    </div>
                    <div className="relative">
                        <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Apellido</label>
                        <input
                        className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
                        type="text" placeholder="Ingresa tu apellido" {...register('lastname')}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="relative">
                        <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Modalidad</label>
                        <select {...register('modality')} defaultValue="presencial" className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500">
                                    <option value="presencial">Presencial</option>
                                    <option value="remoto">Remoto</option>
                                    <option value="hibrido">Híbrido</option>
                                </select>
                    </div>
                    <div className="relative">
                        <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Ubicación</label>
                        <input
                        className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
                        type="text" placeholder="Ingresa tu ubicación" {...register('location')}
                        />
                    </div>
                </div>
                <div className="relative">
                    <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Posición</label>
                    <input
                    className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
                    type="text" placeholder="Ingresa tu posición deseada" {...register('position')}
                    />
                </div>
                <div className="relative">
                    <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Rango salarial</label>
                    <input
                    className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
                    type="number" placeholder="Ingresa el salaro esperado" {...register('expected_salary')}
                    />
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
