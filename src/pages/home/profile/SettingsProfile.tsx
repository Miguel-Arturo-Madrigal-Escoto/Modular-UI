import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setModalOpenProfile } from "../../../app/extra/modalSlice";
import { EditCompanyModal } from "../../auth/EditCompanyModal";
import { EditUserModal } from "../../auth/EditUserModal";
import { useLocation } from "react-router-dom";

export const SettingsProfile = () => {
    const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
    
    const { openProfileModal: open } = useAppSelector(state => state.modal);
    const { user_data } = useAppSelector(state => state.auth);

    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

    return (
        !pathname.includes('recommended-profile') ? (       
            <div className="absolute right-12 mt-4 rounded">
                <div>
                    { open && user_data?.company && <EditCompanyModal /> }
                    { open && user_data?.user && <EditUserModal /> }
                </div>
                <button onClick={ () => setIsSettingsOpen(!isSettingsOpen)} className="border border-gray-400 p-2 rounded text-gray-300 hover:text-gray-300 bg-gray-100 bg-opacity-10 hover:bg-opacity-20" title="Settings">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                    </svg>
                </button>
                { isSettingsOpen &&
                <div className="bg-white absolute right-0 w-40 py-2 mt-1 border border-gray-200 shadow-2xl">
                    <div className="py-2 border-b">
                        <p className="text-gray-400 text-xs px-6 uppercase mb-1">Ajustes</p>

                        <button className="w-full flex items-center px-6 py-1.5 space-x-2 hover:bg-gray-200" onClick={ () => dispatch(setModalOpenProfile()) }>
                            <svg className="feather feather-edit h-4 w-4 text-gray-400" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                            <span className="text-sm text-gray-700">Editar Perfil</span>
                        </button>
                    </div>
                </div> }
            </div> 
        ) : <></>
  )
}
