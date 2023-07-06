
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ILogin } from './types/interfaces'
import { HeaderForm } from './HeaderForm'
import { SideBarForm } from './SideBarForm'
import { IsValidEmail } from '../../components/auth/IsValidEmail';
import { useEmailValid } from './hooks/useEmailValid'
import '../../styles/auth.css'


export const Login = () => {

    const {
      register,
      handleSubmit,
      watch
    } = useForm<ILogin>()

    const navigate = useNavigate();

    const { isEmailValid } = useEmailValid(watch('email'))


    const onSubmit: SubmitHandler<ILogin> = data => console.log(data);
    
    
    return (
        <>
          <div className="relative min-h-screen flex ">
            <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
              <SideBarForm />

              <div className="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full w-2/5 xl:w-2/5 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white">
                <div className="max-w-md w-full space-y-8">

                  {/* Header form */}
                  <HeaderForm title='Iniciar sesión'  message='Inicia sesión con tu cuenta' />

                  {/* Formulario */}
                  <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" name="remember" value="true"/>
                    <div className="relative">
                      {
                        isEmailValid && <IsValidEmail />
                      }
                      
                      <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">E-mail</label>
                      <input
                        className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
                        type="email" placeholder="mail@gmail.com"
                        {...register('email')}
                      />
                    </div>
                    <div className="mt-8 content-center">
                      <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
                        Contraseña
                      </label>
                      <input
                        className="w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
                        type="password" placeholder="Ingresa tu contraseña"
                        {...register('password')}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input id="remember_me" name="remember_me" type="checkbox"
                          className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"/>
                        <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                          Recuérdame
                        </label>
                      </div>
                      <div className="text-sm">
                        <a href="#" className="text-indigo-400 hover:text-blue-700">
                          ¿Olvidaste tu contraseña?
                        </a>
                      </div>
                    </div>
                    <div>
                      <button type="submit"
                        className="w-full flex justify-center bg-gradient-to-r from-indigo-500 to-red-600  hover:bg-gradient-to-l hover:from-red-500 hover:to-indigo-600 text-white p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                        Iniciar sesión
                      </button>
                    </div>
                    <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
                      <span>¿No tienes una cuenta?</span>
                      <button onClick={ () => navigate('/register') }
                        className="text-indigo-400 hover:text-blue-700 no-underline hover:underline cursor-pointer transition ease-in duration-300">Regístrate</button>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
    )
}
