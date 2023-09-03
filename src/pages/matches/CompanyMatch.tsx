import { FC } from 'react'
import { IUserProfile } from '../../app/types/interfaces'
import { defaultImageProfile } from '../../components/common/constants'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useNavigate } from 'react-router'
import { setActiveUserChat } from '../../app/chat/chatSlice'

interface Props {
    user: IUserProfile
}

export const CompanyMatch: FC<Props> = ({ user}) => {

    const { positions } = useAppSelector(state => state.form);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onStartNewMessage = () => {
        dispatch(setActiveUserChat(user.base_user));
        navigate('/messages');
    }

    return (
        <div className="max-w-5xl w-full mx-auto z-10 ">
            <div className="flex flex-col">
                <div className="bg-white border border-white shadow-lg  rounded-3xl p-4 m-4">
                    <div className="flex-none sm:flex">
                        <div className=" relative h-32 w-32   sm:mb-0 mb-3">
                            <img src={ user.image || defaultImageProfile } alt="Imagen del match (user)" className=" w-32 h-32 object-cover rounded-2xl" />
                        </div>
                        <div className="flex-auto sm:ml-5 justify-evenly">
                            <div className="flex items-center justify-between sm:mt-2">
                                <div className="flex items-center">
                                    <div className="flex flex-col">
                                        <div className="w-full flex-none text-lg text-gray-800 font-bold leading-none">{ `${ user.name } ${ user.lastname }` }</div>
                                        <div className="flex-auto text-gray-500 my-1">
                                            <span className="mr-3 ">{ positions.find(p => p.id === user.position)?.display }</span><span className="mr-3 border-r border-gray-200  max-h-0"></span><span>{ user.location }</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-start">
                                <div className="flex-auto text-gray-500 my-1">
                                    <span className="mr-3 ">Salario esperado: { user.expected_salary }</span>
                                </div>
                                <div className="flex-auto text-gray-500 my-1">
                                    <span className="mr-3 ">{ user.about }</span>
                                </div>
                            </div>
                            <div className="flex pt-2  text-sm text-gray-500">
                                <button className="flex items-center bg-gradient-to-r from-indigo-500 to-red-500  hover:bg-gradient-to-l hover:from-red-600 hover:to-indigo-600 text-white px-4 py-2 rounded text-sm space-x-2 transition duration-100"
                                    onClick={ onStartNewMessage }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd"></path>
                                    </svg>
                                    <span>Enviar mensaje</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
