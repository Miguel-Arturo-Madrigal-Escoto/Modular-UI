import { FC } from 'react'
import { ICompany } from './types/interfaces';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { onGetCurrentUserData, onUpdateProfile } from '../../app/auth/thunks';
import { FormErrorMessage } from '../../components/auth/FormErrorMessage';
import { setModalClosedProfile } from '../../app/extra/modalSlice';
import { TitleForm } from "./TitleForm";

interface Props {
    option: string;
}

export const CompanyFormEdit: FC<Props> = ({ option }) => {
    const { errors, user_data, access } = useAppSelector(state => state.auth);
    const { sectors } = useAppSelector(state => state.form);

    const {
        register,
        handleSubmit
    } = useForm<ICompany>({
        defaultValues: {
            name: user_data!.company!.name,
            sector: user_data!.company!.sector,
            location: user_data!.company!.location,
            about: user_data!.company!.about,
            mission: user_data!.company!.mission,
            vision: user_data!.company!.vision,
        }
    });
    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<ICompany> = async (data) => {
        try {
            await dispatch(onUpdateProfile({
                data,
                option,
                id: user_data!.company!.id
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
            <TitleForm title={'Modificar compañía'}/>
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
                    <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Sector empresarial</label>
                    <select {...register('sector')} defaultValue="educacion" className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500">
                    {
                        sectors.map((sector, idx) => (
                            <option value={ sector.value } key={ idx }>{ sector.display}</option>
                        ))
                    }
                    </select>
                    {
                        errors.sector && <FormErrorMessage message={errors.sector} />
                    }
                </div>

                <div className="relative">
                    <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Ubicación</label>
                    <select {...register('location')} defaultValue="aguascalientes" className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500">
                    {
                        sectors.map((sector, idx) => (
                            <option value={ sector.value } key={ idx }>{ sector.display}</option>
                        ))
                    }
                    </select>
                    {
                        errors.location && <FormErrorMessage message={errors.location} />
                    }
                </div>

                <div className="relative">
                    <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Acerca de</label>
                    <textarea rows={4} cols={40} className=" w-full text-base px-4 py-2 border border-gray-300 focus:outline-none   resize-none focus:border-indigo-500" {...register('about')}/>
                    {
                        errors.about && <FormErrorMessage message={ errors.about }/>
                    }
                </div>

                <div className="relative">
                    <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Misión</label>
                    <textarea rows={4} cols={40} className=" w-full text-base px-4 py-2 border border-gray-300 focus:outline-none  resize-none focus:border-indigo-500" {...register('mission')}/>
                    {
                        errors.mission && <FormErrorMessage message={ errors.mission }/>
                    }
                </div>

                <div className="relative">
                    <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Visión</label>
                    <textarea rows={4} cols={40} className=" w-full text-base px-4 py-2 border border-gray-300 focus:outline-none  resize-none focus:border-indigo-500" {...register('vision')}/>
                    {
                        errors.vision && <FormErrorMessage message={ errors.vision }/>
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
