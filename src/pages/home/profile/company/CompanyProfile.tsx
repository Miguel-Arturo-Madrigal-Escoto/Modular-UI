import { FC } from "react";
import { ICurrentUser } from "../../../auth/types/interfaces";
import { HeaderProfile } from "../HeaderProfile";
import { ExperienceProfile } from "../user/ExperienceProfile";
import { ConnectionsProfile } from "../ConnectionsProfile";
import { InfoProfile } from "../user/InfoProfile";
import { SkillsProfile } from "../user/SkillsProfile";
import { RolesProfile } from "./RolesProfile";

interface Props {
  user: ICurrentUser;
}
export const CompanyProfile: FC<Props> = ({ user }) => {

  return (
    <>
      <div className="h-full bg-gray-200 p-8">
        <HeaderProfile
          name={user!.company!.name}
          location={ "Ubicación, Ubicación"}
          position={ "Empresa farmacobiologa"} //TIPO DE EMPRESA
        />

        <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
          <div className="w-full flex flex-col 2xl:w-1/3">
            <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
              <h4 className="text-xl text-gray-900 font-bold">Acerca de { user!.company!.name }</h4>
              <p className="mt-2 text-gray-700 break-all">
                {user!.company!.about}
              </p>
            </div>

            <div className="flex-1 bg-white rounded-lg shadow-xl p-8 mt-4">
              <h4 className="text-xl text-gray-900 font-bold">Misión</h4>
              <p className="mt-2 text-gray-700 break-all">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere, incidunt, maiores quos nostrum cupiditate in, laborum vero ut fugiat architecto obcaecati possimus dolores reprehenderit quidem nesciunt enim ad iusto cumque.
              </p>
            </div>

            <div className="flex-1 bg-white rounded-lg shadow-xl p-8 mt-4">
              <h4 className="text-xl text-gray-900 font-bold">Visión</h4>
              <p className="mt-2 text-gray-700 break-all">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere, incidunt, maiores quos nostrum cupiditate in, laborum vero ut fugiat architecto obcaecati possimus dolores reprehenderit quidem nesciunt enim ad iusto cumque.
              </p>
            </div>

          </div>
          <div className="flex flex-col w-full 2xl:w-2/3">
            <RolesProfile />

          </div>
        </div>
        <ConnectionsProfile />
      </div>
    </>
  );
};
