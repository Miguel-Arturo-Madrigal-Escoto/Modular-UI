export const SkillsProfile = () => {
  return (
    <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
        <h4 className="text-xl text-gray-900 font-bold">Habilidades</h4>
        <div className="relative px-4">
            <div className="absolute h-full border border-dashed border-opacity-20 border-secondary"></div>

            {/* <!-- start::Timeline item --> */}
            <div className="flex items-center w-full my-6 -ml-1.5">
                <div className="w-1/12 z-10">
                    <div className="w-3.5 h-3.5 bg-gradient-to-r from-indigo-500 to-red-500 rounded-full"></div>
                </div>
                <div className="w-11/12">
                    <p className="text-sm">Profile informations changed.</p>
                    <p className="text-xs text-gray-500">3 min ago</p>
                </div>
            </div>
            {/* <!-- end::Timeline item --> */}

            {/* <!-- start::Timeline item --> */}
            <div className="flex items-center w-full my-6 -ml-1.5">
                <div className="w-1/12 z-10">
                    <div className="w-3.5 h-3.5 bg-gradient-to-r from-indigo-500 to-red-500 rounded-full"></div>
                </div>
                <div className="w-11/12">
                    <p className="text-sm">
                        Connected with <a href="#" className="text-blue-600 font-bold">Colby Covington</a>.</p>
                    <p className="text-xs text-gray-500">15 min ago</p>
                </div>
            </div>
            {/* <!-- end::Timeline item --> */}

            {/* <!-- start::Timeline item --> */}
            <div className="flex items-center w-full my-6 -ml-1.5">
                <div className="w-1/12 z-10">
                    <div className="w-3.5 h-3.5 bg-gradient-to-r from-indigo-500 to-red-500 rounded-full"></div>
                </div>
                <div className="w-11/12">
                    <p className="text-sm">Invoice <a href="#" className="text-blue-600 font-bold">#4563</a> was created.</p>
                    <p className="text-xs text-gray-500">57 min ago</p>
                </div>
            </div>
            {/* <!-- end::Timeline item --> */}
        </div>
    </div>
  )
}