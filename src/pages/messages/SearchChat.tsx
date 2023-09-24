import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { ISearchForm } from '../auth/types/interfaces';
import { useAppDispatch } from '../../app/hooks';
import { setSearchText } from '../../app/chat/chatSlice';

export const SearchChat: FC = () => {

    const { register, watch } = useForm<ISearchForm>({
        defaultValues: {
            search: ''
        }
    });
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setSearchText(watch('search')));

    }, [watch('search')]);

    return (
        <form onSubmit={ (e) => e.preventDefault() }>
            <div className="relative">
                <label>
                    <input className="rounded-full py-2 pr-6 pl-10 w-full border-none focus:border-gray-700 bg-gray-100  focus:outline-none focus:shadow-md transition duration-300 ease-in"
                        type="text" placeholder="Buscar usuario" {...register('search')} />
                    <span className="absolute top-0 left-0 mt-2 ml-3 inline-block">
                        <svg viewBox="0 0 24 24" className="w-6 h-6">
                            <path fill="#bbb"
                                d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/>
                        </svg>
                    </span>
                </label>
            </div>
        </form>
    )
}
