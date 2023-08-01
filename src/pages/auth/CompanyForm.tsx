import { FC } from 'react'
import { ICompany } from './types/interfaces';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { onCreateProfile, onGetCurrentUserData } from '../../app/auth/thunks';
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

    const { errors, user_data, access } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const onSubmit: SubmitHandler<ICompany> = async (data) => {
        localStorage.setItem('profile', option);

        try {
            await dispatch(onCreateProfile({
                data: {
                    ...data,
                    image: data.image[0] || null,
                    base_user: user_data?.id
                },
                option
            })).unwrap();
            await dispatch(onGetCurrentUserData({ access: access! }))

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
                            <option value="educacion">Educación</option>
                            <option value="salud">Salud</option>
                            <option value="alimentos">Alimentos</option>
                            <option value="financiero">Finanzas</option>
                            <option value="software">Software</option>
                            <option value="tecnologias de la informacion">Tecnologías de la información (TI)</option>
                            <option value="transporte">Transporte</option>
                            <option value="turismo">Turismo</option>
                            <option value="telecomunicaciones">Telecomunicaciones</option>
                            <option value="ventas">Ventas</option>
                            <option value="otro">Otro</option>

                </select>
                {
                    errors.sector && <FormErrorMessage message={errors.sector} />
                }
            </div>

            <div className="relative">
                <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Ubicación</label>
                <select {...register('location')} defaultValue="aguascalientes" className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500">
                            <option value="aguascalientes">AGUASCALIENTES</option>
                            <option value="baja california">BAJA CALIFORNIA</option>
                            <option value="baja california sur">BAJA CALIFORNIA SUR</option>
                            <option value="chihuahua">CHIHUAHUA</option>
                            <option value="chiapas">CHIAPAS</option>
                            <option value="campeche">CAMPECHE</option>
                            <option value="ciudad de mexico">CIUDAD DE MEXICO</option>
                            <option value="coahuila">COAHUILA</option>
                            <option value="colima">COLIMA</option>
                            <option value="durango">DURANGO</option>
                            <option value="guerrero">GUERRERO</option>
                            <option value="guanajuato">GUANAJUATO</option>
                            <option value="hidalgo">HIDALGO</option>
                            <option value="jalisco">JALISCO</option>
                            <option value="michoacan">MICHOACAN</option>
                            <option value="estado de mexico">ESTADO DE MEXICO</option>
                            <option value="morelos">MORELOS</option>
                            <option value="nayarit">NAYARIT</option>
                            <option value="nuevo leon">NUEVO LEON</option>
                            <option value="oaxaca">OAXACA</option>
                            <option value="puebla">PUEBLA</option>
                            <option value="quintana roo">QUINTANA ROO</option>
                            <option value="queretaro">QUERETARO</option>
                            <option value="sinaloa">SINALOA</option>
                            <option value="san luis potosi">SAN LUIS POTOSI</option>
                            <option value="sonora">SONORA</option>
                            <option value="tabasco">TABASCO</option>
                            <option value="tlaxcala">TLAXCALA</option>
                            <option value="tamaulipas">TAMAULIPAS</option>
                            <option value="veracruz">VERACRUZ</option>
                            <option value="yucatan">YUCATAN</option>
                            <option value="zacatecas">ZACATECAS</option>
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
