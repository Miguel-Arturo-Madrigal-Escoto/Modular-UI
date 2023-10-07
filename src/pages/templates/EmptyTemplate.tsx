import { Link } from "react-router-dom"

export const EmptyTemplate = ({scope}) => {
    return (
        <div className="flex flex-col  justify-center items-center w-full">
             <div className="px-6 py-4 ">
                <p className="text-gray-700 text-base">
                    Parece que aún no tienes {scope}. ¡Comienza tu busqueda&nbsp;
                   <Link to="/for-you"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                        aquí!
                    </Link>
                </p>
            </div>
        </div>
    )
}
