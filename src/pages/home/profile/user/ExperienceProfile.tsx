import { setModalOpenExperience } from "../../../../app/extra/modalSlice";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { AddUserExperienceModal } from "../../../experience/AddUserExperienceModal";
import dayjs from 'dayjs'

export const ExperienceProfile = () => {
    
    const { openExperienceModal } = useAppSelector(state => state.modal);
    const { experiences } = useAppSelector(state => state.experience);
    const { positions } = useAppSelector(state => state.form);
    const { user_data } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();


    return (
        <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
            <div>
                { openExperienceModal && <AddUserExperienceModal /> }
            </div>
            <h4 className="text-xl text-gray-900 font-bold">Experiencia</h4>
            <div className="relative px-4">
                {
                    user_data?.user?.id && (
                        <button className="flex items-center px-6 py-1.5 space-x-2 hover:bg-pink-50" onClick={ () => dispatch(setModalOpenExperience()) }>
                            <svg className="feather feather-edit h-4 w-4 text-gray-400" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                            <span className="text-sm text-gray-500">Modificar experiencia</span>
                        </button>
                    )
                }
                <div className="absolute h-full border border-dashed border-opacity-20 border-secondary"></div>

                {/* <!-- start::Timeline item --> */}
                {
                    experiences.map((experience) => (
                        <div className="flex items-center w-full my-6 -ml-1.5" key={ experience.id }>
                            <div className="w-1/12 z-10">
                                <div className="w-3.5 h-3.5 bg-gradient-to-r from-indigo-500 to-red-500 rounded-full"></div>
                            </div>
                            <div className="w-11/12">
                                <p className="text-sm">{ dayjs(experience.start_date).locale('es').format("DD/MMMM/YYYY")} - { dayjs(experience.end_date).locale('es').format("DD/MMMM/YYYY") }</p>
                                <p className="text-sm">{ positions.find(position => position.id === experience.role )?.display }</p>
                                <p className="text-sm">{ experience.description }</p>
                            </div>
                        </div>
                    ))
                }
              
            </div>
        </div>
  )
}
