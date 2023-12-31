
import { useNavigate } from 'react-router-dom';
import { HeaderForm } from './HeaderForm';
import { SideBarForm } from './SideBarForm';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IRegister } from './types/interfaces';
import { useEmailValid } from './hooks/useEmailValid';
import { IsValidEmail } from '../../components/auth/IsValidEmail';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { onRegister } from '../../app/auth/thunks';
import { LoadingScreen } from '../../components/common/LoadingScreen';
import { FormErrorMessage } from '../../components/auth/FormErrorMessage';
import '../../styles/auth.css'

export const Register = () => {

  const {
    register,
    handleSubmit,
    watch
  } = useForm<IRegister>()

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, errors } = useAppSelector(state => state.auth);

  const { isEmailValid } = useEmailValid(watch('email'))

  const onSubmit: SubmitHandler<IRegister> = async data => {
      if (data.password !== data.confirmPassword) return;
      try {
          await dispatch(onRegister({
            username: data.username,
            email: data.email,
            password: data.password,
          })).unwrap();     
      } catch (error) {
        
      }
  }

  if (loading) {
      return <LoadingScreen />
  }

  return (
      <>
        <div className="relative min-h-screen flex ">
            <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
              <SideBarForm />
              
              <div className="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full w-2/5 xl:w-2/5 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white">
                <div className="max-w-md w-full space-y-8">
                  {/* Header form */}
                  <HeaderForm title='Regístrate'  message='Regístrate con tu cuenta' />

                  {/* Formulario */}
                  <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" name="remember" value="true"/>
                    <div className="relative">
                      {
                        isEmailValid && <IsValidEmail />
                      }
                      <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Email</label>
                      <input
                        className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
                        type="email" placeholder="mail@gmail.com" {...register('email')}/>
                        {
                          errors.email && <FormErrorMessage message={ errors.email }/>
                        }
                    </div>
                    <div className="mt-8 content-center">
                      <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
                        Nombre de usuario
                      </label>
                      <input
                        className="w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
                        type="text" placeholder="Ingresa tu nombre de usuario" {...register('username')}/>
                        {
                          errors.username && <FormErrorMessage message={ errors.username }/>
                        }
                    </div>
                    <div className="mt-8 content-center">
                      <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
                        Contraseña
                      </label>
                      <input
                        className="w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
                        type="password" placeholder="Ingresa tu contraseña" {...register('password')}/>
                        {
                          errors.password && <FormErrorMessage message={ errors.password }/>
                        }
                    </div>
                    <div className="mt-8 content-center">
                      <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
                        Confirma tu contraseña
                      </label>
                      <input
                        className="w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
                        type="password" placeholder="***********" {...register('confirmPassword')}/>
                    </div>
                    <div>
                      <button type="submit"
                        className="w-full flex justify-center bg-gradient-to-r from-indigo-500 to-red-600  hover:bg-gradient-to-l hover:from-red-500 hover:to-indigo-600 text-white p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                        Registrarse
                      </button>
                    </div>
                    <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
                      <span>¿Ya tienes una cuenta?</span>
                      <button onClick={ () => navigate('/login') }
                        className="text-indigo-400 hover:text-blue-700 no-underline hover:underline cursor-pointer transition ease-in duration-300">Inicia sesión</button>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
      </>
    )
}
