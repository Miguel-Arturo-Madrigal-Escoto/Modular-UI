import { FC } from 'react'
import { ICompany } from './types/interfaces';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { onCreateProfile, onGetCurrentUserData } from '../../app/auth/thunks';
import { FormErrorMessage } from '../../components/auth/FormErrorMessage';
import { useNavigate } from 'react-router-dom';
import { onSaveNewSector } from '../../app/sectors/thunks';
import { fetchFormData } from '../../app/form/thunks';

interface Props {
  option: string;
}

export const CompanyForm: FC<Props> = ({ option }) => {
    const {
        register,
        handleSubmit,
        watch
    } = useForm<ICompany>({
        defaultValues: {
            new_sector: ''
        }
    })

    const { errors, user_data, access } = useAppSelector(state => state.auth);
    const { sectors, locations } = useAppSelector(state => state.form);
    const { errors: errors_sector } = useAppSelector(state => state.sectors);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const onSubmit: SubmitHandler<ICompany> = async (data) => {
        localStorage.setItem('profile', option);
        let newSectorId: number | undefined = undefined;

        try {
            if (data.sector === '-1')
                newSectorId = await dispatch(onSaveNewSector({ name: data.new_sector })).unwrap()
        } catch (error) {
            console.log(error);
        }

        try {
            await dispatch(onCreateProfile({
                data: {
                    ...data,
                    sector: data.sector === '-1' ? newSectorId : data.sector,
                    image: data.image[0] || null,
                    base_user: user_data?.id
                },
                option
            })).unwrap();
            await dispatch(onGetCurrentUserData({ access: access! }))
            await dispatch(fetchFormData());

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
                            <option value={ sector.id } key={ idx }>{ sector.display}</option>
                        ))
                    }
                    </select>
                    {
                        errors.sector && watch('sector') !== '-1' && <FormErrorMessage message={errors.sector} />
                    }
                </div>

                {
                    watch('sector') === '-1' && (
                        <div className="relative">
                            <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Nuevo sector empresarial</label>
                            <input
                            className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
                            type="text" placeholder="Especifica el sector de la empresa" {...register('new_sector')}
                            />
                            {
                                errors_sector.name && <FormErrorMessage message={ errors_sector.name }/>
                            }
                        </div>
                    ) 
                }

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

                <div className="relative">
                    <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Foto de perfil (opcional)</label>
                    <input
                        className="w-full text-base px-4 py-2 focus:outline-none rounded-2xl focus:border-indigo-500"
                        type="file" placeholder="Selecciona una imagen" {...register('image')}
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
