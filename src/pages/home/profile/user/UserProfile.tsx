import { FC } from "react";
import { InfoProfile } from "./InfoProfile";
import { ExperienceProfile } from "./ExperienceProfile";
import { SkillsProfile } from "./SkillsProfile";
import { ConnectionsProfile } from "../ConnectionsProfile";
import { HeaderProfile } from "../HeaderProfile";
import { ICurrentUser } from "../../../../app/types/interfaces";


interface Props {
  user: ICurrentUser;
}

export const UserProfile: FC<Props> = ({ user }) => {

  return (
    <>
      <div className="h-full bg-gray-200 p-8">
        <HeaderProfile
          name={user!.user!.name}
          location={user!.user!.location}
          position={user!.user!.position}
          image={ user!.user!.image }
        />

        <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
          <div className="w-full flex flex-col 2xl:w-1/3">
            <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
              <h4 className="text-xl text-gray-900 font-bold">Acerca de mí</h4>
              <p className="mt-2 text-gray-700 break-all capitalize">
                {user!.user!.about}
              </p>
            </div>

            <InfoProfile user={user} />
          </div>
          <div className="flex flex-col w-full 2xl:w-2/3">
            <ExperienceProfile />

            <SkillsProfile />
          </div>
        </div>
        {/* <ConnectionsProfile /> */}
      </div>
    </>
  );
};
