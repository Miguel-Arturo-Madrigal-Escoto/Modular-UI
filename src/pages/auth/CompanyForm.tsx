import { FC } from 'react'
import { ICompany } from './types/interfaces';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useCurrentUser } from './hooks/useCurrentUser';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { onCreateProfile } from '../../app/auth/thunks';
import { FormErrorMessage } from '../../components/auth/FormErrorMessage';
import { useNavigate } from 'react-router-dom';

interface Props {
  option: string;
}

export const CompanyForm: FC<Props> = ({ option }) => {
    const {
        register,
        handleSubmit
    } = useForm<ICompany>()

    const { access, errors } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const currentUserQuery = useCurrentUser(access);

    const onSubmit: SubmitHandler<ICompany> = async (data) => {
        localStorage.setItem('profile', option);

        try {
            await dispatch(onCreateProfile({
                data: {
                    ...data,
                    image: data.image[0] || null,
                    base_user: currentUserQuery.data?.id
                },
                option
            })).unwrap();

            navigate('/for-you');
            
        } catch (error) {
            // Todo: mostrar alerta de no pudo crear perfil
            console.log('error: ', error)   
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
                {
                    errors.name && <FormErrorMessage message={ errors.name }/>
                }
            </div>
            <div className="relative">
                <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Acerca de</label>
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
