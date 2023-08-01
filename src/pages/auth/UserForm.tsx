import { FC } from 'react'
import { SubmitHandler, useForm } from "react-hook-form";
import { IProfile } from "./types/interfaces";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { onCreateProfile, onGetCurrentUserData } from '../../app/auth/thunks';
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
    
    const { errors, user_data, access } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

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