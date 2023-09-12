import { FC } from "react";
import { HeaderProfile } from "../HeaderProfile";
import { RolesProfile } from "./RolesProfile";
import { ICurrentUser } from "../../../../app/types/interfaces";
import { useLocation } from "react-router-dom";
import { ConnectionsProfile } from "../ConnectionsProfile";

interface Props {
  user: ICurrentUser;
}

export const CompanyProfile: FC<Props> = ({ user }) => {

  const { pathname } = useLocation();

  return (
    <>
      <div className="h-full bg-gray-200 p-8">
        <HeaderProfile
          name={user!.company!.name}
          location={ user!.company!.location }
          position={ user!.company!.sector } //SECTOR
          image={ user!.company!.image }
        />

        <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
          <div className="w-full flex flex-col 2xl:w-1/3">
            <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
              <h4 className="text-xl text-gray-900 font-bold">Acerca de { user!.company!.name }</h4>
              <p className="mt-2 text-gray-700 break-all capitalize">
                {user!.company!.about}
              </p>
            </div>

            <div className="flex-1 bg-white rounded-lg shadow-xl p-8 mt-4">
              <h4 className="text-xl text-gray-900 font-bold">Misión</h4>
              <p className="mt-2 text-gray-700 break-all capitalize">
                {user!.company!.mission}
              </p>
            </div>

            <div className="flex-1 bg-white rounded-lg shadow-xl p-8 mt-4">
              <h4 className="text-xl text-gray-900 font-bold">Visión</h4>
              <p className="mt-2 text-gray-700 break-all capitalize">
                {user!.company!.vision}
              </p>
            </div>

          </div>
          <div className="flex flex-col w-full 2xl:w-2/3">
            <RolesProfile />

          </div>
        </div>
        {
            // Show recommended profiles (users or companies) if the pathname is '/recommended-profile'
            pathname.includes('recommended-profile') && <ConnectionsProfile />
        } 
      </div>
    </>
  );
};
