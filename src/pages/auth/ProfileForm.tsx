import { SideBarForm } from "./SideBarForm"
import { useForm } from 'react-hook-form'
import { IProfileOrCompany } from "./types/interfaces"
import { TitleForm } from "./TitleForm"
import { UserForm } from "./UserForm"
import { CompanyForm } from "./CompanyForm"
import { useUserOrCompany } from "./hooks/useUserOrCompany"
import { useAppSelector } from "../../app/hooks"
import { Navigate } from "react-router-dom"

export const ProfileForm = () => {
    const {
        register,
        watch
    } = useForm<IProfileOrCompany>({
        defaultValues: {
            option: localStorage.getItem('profile') || 'user'
        }
    });

    const { isUser } = useUserOrCompany(watch('option'));

    const { user_data } = useAppSelector(state => state.auth);

    if (user_data?.company !== null || user_data?.user !== null){
        return <Navigate to="/for-you" />
    }



    return (
        <>
            <div className="relative min-h-screen flex ">
                <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
                    <SideBarForm />

                    <div className="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full w-2/5 xl:w-2/5 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white">
                    <div className="max-w-md w-full space-y-8">
                        <TitleForm title='Crear perfil'  message='¿Qué clase de perfil quieres crear?' />

                        <div className="relative">
                            <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Soy</label>
                            <select {...register('option')} defaultValue={ watch('option') } className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500">
                                <option value="user">Usuario</option>
                                <option value="company">Compañía</option>
                            </select>
                        </div>

                        { isUser ? <UserForm option={watch('option')} /> : <CompanyForm option={watch('option')} />}
                        

                    </div>
                    </div>
                </div>
            </div>
        </>
  )
}
