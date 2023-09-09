import { useEffect } from "react";
import { setModalOpenRoles } from "../../../../app/extra/modalSlice";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { RolesModal } from "../../../auth/RolesModal";
import { onGetCompanyRoles } from "../../../../app/roles/thunks";
import dayjs from 'dayjs'

export const RolesProfile = () => {
    
    const { openRolesModal } = useAppSelector(state => state.modal);
    const { company_roles } = useAppSelector(state => state.roles);
    const { access, user_data } = useAppSelector(state => state.auth);
    const storageRecommendedCompany = JSON.parse(localStorage.getItem('recommendedCompany') || 'null') || null
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (access){
            // Check if i'm the company or the user is viewing my profile
            const company_id = user_data?.company?.id || storageRecommendedCompany?.company?.id

            dispatch(onGetCompanyRoles({
                company_id: company_id!
            }));
        }
        
    }, [access]);

    return (
        <div className="flex-1 bg-white rounded-lg shadow-xl pt-8 px-8">
             <div>
                { openRolesModal && <RolesModal /> }
            </div>
            <h4 className="text-xl text-gray-900 font-bold">Roles que buscamos</h4>
            {
                user_data?.company?.id && (
                    <button className="flex items-center px-6 py-1.5 space-x-2 hover:bg-pink-50" onClick={ () => dispatch( setModalOpenRoles()) }>
                        <svg className="feather feather-edit h-4 w-4 text-gray-400" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        <span className="text-sm text-gray-500">Modificar roles</span>
                    </button>
                )
            } 
            <div className="relative px-4 divide-y-2 divide-gray-100">
                {
                    company_roles.map(role => (
                        <div className="py-8 flex flex-wrap md:flex-nowrap" key={ role.id }>
                            <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                                <span className="font-semibold title-font text-gray-700 uppercase">{ role.role.position }</span>
                                <span className="mt-1 text-gray-500 text-sm">{ dayjs(role.created_at).locale('es').format("DD/MMMM/YYYY") }  </span>
                            </div>
                            <div className="md:flex-grow">
                                <h4 className="font-medium text-gray-900 title-font mb-2 capitalize">{ role.name }</h4>
                                <p className="leading-relaxed capitalize break-all">{  role.description }</p>
                                <a className="text-pink-500 inline-flex items-center mt-4" href={ role.link } target="_blank">Saber más
                                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14"></path>
                                        <path d="M12 5l7 7-7 7"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>      
                    ))
                }
                              
            </div>
        </div>
    )
  }
  