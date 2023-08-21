import { setModalOpenSkill } from "../../../../app/extra/modalSlice";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { AddUserSkillModal } from "../../../skill/AddUserSkillModal";


export const SkillsProfile = () => {

    const { openSkillModal } = useAppSelector(state => state.modal);
    const { skills } = useAppSelector(state => state.skill);
    const dispatch = useAppDispatch();

    return (
        <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
            <div>
                {openSkillModal && <AddUserSkillModal />}
            </div>
            <h4 className="text-xl text-gray-900 font-bold">Habilidades</h4>
            <div className="relative px-4">
                <button className="flex items-center px-6 py-1.5 space-x-2 hover:bg-pink-50" onClick={() => dispatch(setModalOpenSkill())}>
                    <svg className="feather feather-edit h-4 w-4 text-gray-400" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                    <span className="text-sm text-gray-500">Modificar habilidad</span>
                </button>
                <div className="absolute h-full border border-dashed border-opacity-20 border-secondary"></div>

                {
                    skills.map((skill) => (
                        <div key={skill.name} className="flex items-center w-full my-6 -ml-1.5">
                            <div className="w-1/12 z-10">
                                <div className="w-3.5 h-3.5 bg-gradient-to-r from-indigo-500 to-red-500 rounded-full"></div>
                            </div>
                            <div className="w-11/12">
                                <p className="text-sm">{skill.name}</p>
                                <p className="text-sm">{skill.description}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
