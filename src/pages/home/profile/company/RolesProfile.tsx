import { setModalOpenRoles } from "../../../../app/extra/modalSlice";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { RolesModal } from "../../../auth/RolesModal";

export const RolesProfile = () => {
    
    const { openRolesModal } = useAppSelector(state => state.modal);
    const dispatch = useAppDispatch();

    return (
        <div className="flex-1 bg-white rounded-lg shadow-xl pt-8 px-8">
             <div>
                { openRolesModal && <RolesModal /> }
            </div>
            <h4 className="text-xl text-gray-900 font-bold">Roles que buscamos</h4>
            <button className="flex items-center px-6 py-1.5 space-x-2 hover:bg-pink-50" onClick={ () => dispatch( setModalOpenRoles()) }>
                <svg className="feather feather-edit h-4 w-4 text-gray-400" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                <span className="text-sm text-gray-500">Modificar roles</span>
            </button>
            <div className="relative px-4 divide-y-2 divide-gray-100">
    
                <div className="py-8 flex flex-wrap md:flex-nowrap">
                    <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                        <span className="font-semibold title-font text-gray-700">INGENIERÍA</span>
                        <span className="mt-1 text-gray-500 text-sm">12 Jun 2019</span>
                    </div>
                    <div className="md:flex-grow">
                        <h4 className="font-medium text-gray-900 title-font mb-2">Ingeniero mecánico</h4>
                        <p className="leading-relaxed">Glossier echo park pug, church-key sartorial biodiesel vexillologist pop-up snackwave ramps cornhole. Marfa 3 wolf moon party messenger bag selfies, poke vaporware kombucha lumbersexual pork belly polaroid hoodie portland craft beer.</p>
                        <a className="text-pink-500 inline-flex items-center mt-4">Learn More
                        <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                        </svg>
                        </a>
                    </div>
                </div>      

                <div className="py-8 flex flex-wrap md:flex-nowrap">
                    <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                        <span className="font-semibold title-font text-gray-700">FINANZAS</span>
                        <span className="mt-1 text-gray-500 text-sm">12 Jun 2019</span>
                    </div>
                    <div className="md:flex-grow">
                        <h4 className="font-medium text-gray-900 title-font mb-2">Contador Senior</h4>
                        <p className="leading-relaxed">Glossier echo park pug, church-key sartorial biodiesel vexillologist pop-up snackwave ramps cornhole. Marfa 3 wolf moon party messenger bag selfies, poke vaporware kombucha lumbersexual pork belly polaroid hoodie portland craft beer.</p>
                        <a className="text-pink-500 inline-flex items-center mt-4">Learn More
                        <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                        </svg>
                        </a>
                    </div>
                </div>  

                <div className="py-8 flex flex-wrap md:flex-nowrap">
                    <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                        <span className="font-semibold title-font text-gray-700">INGENIERÍA</span>
                        <span className="mt-1 text-gray-500 text-sm">12 Jun 2019</span>
                    </div>
                    <div className="md:flex-grow">
                        <h4 className="font-medium text-gray-900 title-font mb-2">Ingeniero mecánico</h4>
                        <p className="leading-relaxed">Glossier echo park pug, church-key sartorial biodiesel vexillologist pop-up snackwave ramps cornhole. Marfa 3 wolf moon party messenger bag selfies, poke vaporware kombucha lumbersexual pork belly polaroid hoodie portland craft beer.</p>
                        <a className="text-pink-500 inline-flex items-center mt-4">Learn More
                        <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                        </svg>
                        </a>
                    </div>
                </div>           
                              
            </div>
        </div>
    )
  }
  