import { SideBarForm } from "./SideBarForm"
import { useForm } from 'react-hook-form'
import { IProfileOrCompany } from "./types/interfaces"
import { TitleForm } from "./TitleForm"
import { UserForm } from "./UserForm"
import { CompanyForm } from "./CompanyForm"

export const ProfileForm = () => {
    const {
        register,
        watch
      } = useForm<IProfileOrCompany>()

    const isCompany = watch('option') === "company";
    const isUser = watch('option', 'user') === "user";
    console.log({isCompany});
    console.log({isUser});

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
                        <select {...register('option')} defaultValue="user" className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500">
                            <option value="user">Usuario</option>
                            <option value="company">Compañía</option>
                        </select>
                    </div>

                    { isCompany && <CompanyForm />}
                    { isUser && <UserForm />}
                    

                </div>
                </div>
            </div>
        </div>
    </>
  )
}