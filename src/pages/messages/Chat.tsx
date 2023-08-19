import React from 'react'

export default function Chat() {
  return (
    <>
        <section className="flex flex-col flex-auto border-l border-gray-200">
            <div className="chat-header px-6 py-4 flex flex-row flex-none justify-between items-center border-b border-gray-200">
                <div className="flex">
                    <div className="w-12 h-12 mr-4 relative flex flex-shrink-0">
                        <img className="shadow-md rounded-full w-full h-full object-cover"
                            src="https://randomuser.me/api/portraits/women/33.jpg"
                            alt=""
                        />
                    </div>
                    <div className="text-sm">
                        <p className="font-bold">Scarlett Johansson</p>
                        <p>Active 1h ago</p>
                    </div>
                </div>
                <div className="flex">
                    <a href="#" className="block rounded-full w-10 h-10 p-2 ml-4">
                        <svg viewBox="0 0 20 20" className="w-full h-full fill-current text-indigo-500">
                            <path d="M2.92893219,17.0710678 C6.83417511,20.9763107 13.1658249,20.9763107 17.0710678,17.0710678 C20.9763107,13.1658249 20.9763107,6.83417511 17.0710678,2.92893219 C13.1658249,-0.976310729 6.83417511,-0.976310729 2.92893219,2.92893219 C-0.976310729,6.83417511 -0.976310729,13.1658249 2.92893219,17.0710678 Z M9,11 L9,10.5 L9,9 L11,9 L11,15 L9,15 L9,11 Z M9,5 L11,5 L11,7 L9,7 L9,5 Z"/>
                        </svg>
                    </a>
                </div>
            </div>
            <div className="chat-body p-4 flex-1 overflow-y-scroll">
                {/* other person msg */}
                <div className="flex flex-row justify-start">
                    <div className="w-8 h-8 relative flex flex-shrink-0 mr-4">
                        <img className="shadow-md rounded-full w-full h-full object-cover"
                            src="https://randomuser.me/api/portraits/women/33.jpg"
                            alt=""
                        />
                    </div>
                    <div className="messages text-sm text-gray-700 grid grid-flow-row gap-2">
                        <div className="flex items-center group">
                            <p className="px-6 py-3 rounded-t-full rounded-r-full bg-gray-200 max-w-xs lg:max-w-md">Hey! How are you?</p>
                        </div>
                        <div className="flex items-center group">
                            <p className="px-6 py-3 rounded-r-full bg-gray-200 max-w-xs lg:max-w-md">Shall we go for Hiking this weekend?</p>
                        </div>
                        <div className="flex items-center group">
                            <p className="px-6 py-3 rounded-b-full rounded-r-full bg-gray-200 max-w-xs lg:max-w-md">Lorem ipsum
                                dolor sit
                                amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                dolore magna aliqua. Volutpat lacus laoreet non curabitur gravida.</p>
                        </div>
                    </div>
                </div>
                {/* end other person msg */}

                <p className="p-4 text-center text-sm text-gray-500">FRI 3:04 PM</p>
                {/* My msg */}
                <div className="flex flex-row justify-end">
                    <div className="messages text-sm text-white grid grid-flow-row gap-2">
                        <div className="flex items-center flex-row-reverse group">
                            <p className="px-6 py-3 rounded-t-full rounded-l-full bg-indigo-700 max-w-xs lg:max-w-md">Hey! How are you?</p>
                        
                        </div>
                        <div className="flex items-center flex-row-reverse group">
                            <p className="px-6 py-3 rounded-l-full bg-indigo-700 max-w-xs lg:max-w-md">Shall we go for Hiking this weekend?</p>
                            
                        </div>
                        <div className="flex items-center flex-row-reverse group">
                            <p className="px-6 py-3 rounded-b-full rounded-l-full bg-indigo-700 max-w-xs lg:max-w-md">Lorem ipsum
                                dolor sit
                                amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                dolore magna aliqua. Volutpat lacus laoreet non curabitur gravida.</p>
                        </div>
                    </div>
                </div>
                {/*End my msg */}
                
            </div>
            <div className="chat-footer flex-none">
                <div className="flex flex-row items-center p-4">
                    <div className="relative flex-grow">
                        <label>
                            <input className="rounded-full py-2 pl-3 pr-10 w-full border border border-gray-800 focus:border-gray-700 bg-gray-100  focus:outline-none focus:shadow-md transition duration-300 ease-in"
                                type="text" placeholder="Mensajitooo"/>
                        </label>
                    </div>
                    <button type="button" className="flex flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-6 h-6">
                        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M0 0l20 10L0 20V0zm0 8v4l10-2L0 8z"/></svg>
                    </button>
                </div>
            </div>
        </section>
    </>
  )
}
