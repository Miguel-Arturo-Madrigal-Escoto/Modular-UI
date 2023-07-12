import { FC } from 'react'
import { ICompany } from './types/interfaces';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createProfile } from './hooks/useCreateProfile';
import { useCurrentUser } from './hooks/useCurrentUser';
import { useAppSelector } from '../../app/hooks';

interface Props {
  option: 'user' | 'company'
}

export const CompanyForm: FC<Props> = ({ option }) => {
    const {
        register,
        handleSubmit
      } = useForm<ICompany>()

      const navigate = useNavigate();
    const { access } = useAppSelector(state => state.auth);

    const currentUserQuery = useCurrentUser(access);

    const onSubmit: SubmitHandler<ICompany> = data => {
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
            <div className="relative">
                <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Nombre de la compañía</label>
                <input
                className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
                type="text" placeholder="Ingresa el nombre de la empresa" {...register('name')}
                />
            </div>
            <div className="relative">
                <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Acerca de</label>
                <textarea rows={4} cols={40} className=" w-full text-base px-4 py-2 border border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500" {...register('about')}/>
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
