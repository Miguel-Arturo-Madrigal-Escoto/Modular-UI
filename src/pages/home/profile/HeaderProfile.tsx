import { FC } from 'react'
import { SettingsProfile } from "./SettingsProfile"
import { defaultImageProfile } from '../../../components/common/constants';

interface Props {
    name: string;
    position: string;
    location: string;
    image: string | null;
}

export const HeaderProfile: FC<Props> = ({ name, position, location, image }) => {
    return (
      <div className="bg-white rounded-lg shadow-xl pb-8">
          <SettingsProfile />
  
          <div className="w-full h-[250px]">
              <img src="https://img.freepik.com/vector-premium/fondo-degradado-lineas-diagonales_714799-228.jpg" className="w-full h-full rounded-tl-lg rounded-tr-lg" />
              {/* <img src="https://i.pinimg.com/originals/1a/c7/38/1ac7382c342c9c7dc6e8eb9a80f0083d.jpg" className="w-full h-full rounded-tl-lg rounded-tr-lg" /> */}
              
          </div>
          <div className="flex flex-col items-center -mt-20">
              <img src={ image || defaultImageProfile } className="w-40 h-40 border-4 border-white rounded-full" />
                <button className="flex items-center px-6 py-1.5 space-x-2 hover:bg-pink-50">
                    <svg className="feather feather-edit h-4 w-4 text-gray-400" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    <span className="text-sm text-gray-500">Editar foto</span>
                </button>
              <div className="flex items-center space-x-2 mt-2">
                  <p className="text-2xl capitalize">{ name }</p>
                  <span className="bg-indigo-500 rounded-full p-1" title="Verified">
                      <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-100 h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path>
                      </svg>
                  </span>
              </div>
              <p className="text-gray-700 capitalize">{ position } </p>
              <p className="text-sm text-gray-500 capitalize">{ location }</p>
          </div>
          <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
              <div className="flex items-center space-x-4 mt-2">
                  <button className="flex items-center bg-gradient-to-r from-indigo-500 to-red-500  hover:bg-gradient-to-l hover:from-red-600 hover:to-indigo-600 text-white px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                      </svg>
                      <span>Connect</span>
                  </button>
                  <button className="flex items-center bg-gradient-to-r from-indigo-500 to-red-500  hover:bg-gradient-to-l hover:from-red-600 hover:to-indigo-600 text-white px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd"></path>
                      </svg>
                      <span>Mensaje</span>
                  </button>
              </div>
          </div>
      </div>
    )
}
  