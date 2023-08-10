import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Role, editRole, removeRole } from "../../app/roles/rolesSlice";



export const CurrentRoles = () => {

    const dispatch = useAppDispatch();


    const { roles } = useAppSelector(state => state.roles);
    
    const onRemoveRole = (id: string) => {
        dispatch(removeRole(id));
    }   

    const onEditRole = (role: Role) => {
        dispatch(editRole({
            id: role.id,
            link: role.link,
            name: role.name,
            position: role.position,
            description: role.description
        }));
    }


    return (

        <div className="p-3 w-full max-w-lg">
            {
                roles.map(role => (
                    <ul className="flex flex-col break-all my-4" key={ role.id! }>
                        <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg ">
                            <div className="md:flex-grow">
                                <h4 className="font-medium text-gray-900 title-font mb-2 capitalize">Posición: {role.position}</h4>
                                <h4 className="font-medium text-gray-900 title-font mb-2 capitalize">Nombre: {role.name}</h4>
                                <textarea rows={4} cols={40} className=" w-full text-base px-4 focus:outline-none resize-none focus:border-indigo-500 capitalize" onBlur={ (e) => onEditRole({ id: role.id!, name: role.name,position: role.position, link: role.link, description: e.target.value }) } defaultValue={ role.description } />
                                
                            </div>
                            <button onClick={ () => onRemoveRole(role.id!) }>
                                <svg className="feather feather-x-circle text-red-400" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"/><line x1="15" x2="9" y1="9" y2="15"/><line x1="9" x2="15" y1="9" y2="15"/></svg>
                            </button>
                        </li>
                    </ul>
                ))
            }
        </div>
    )
}
