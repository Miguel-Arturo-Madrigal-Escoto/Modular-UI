import { ConnectionsProfile } from "./profile/ConnectionsProfile"
import { ExperienceProfile } from "./profile/ExperienceProfile"
import { HeaderProfile } from "./profile/HeaderProfile"
import { InfoProfile } from "./profile/InfoProfile"
import { SkillsProfile } from "./profile/SkillsProfile"

export const Profile = () => {
    return (
        <>
            <div className="h-full bg-gray-200 p-8">
                <HeaderProfile />

                <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">                   
                    <div className="w-full flex flex-col 2xl:w-1/3">
                        <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                            <h4 className="text-xl text-gray-900 font-bold">Acerca de mí</h4>
                            <p className="mt-2 text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt voluptates obcaecati numquam error et ut fugiat asperiores. Sunt nulla ad incidunt laboriosam, laudantium est unde natus cum numquam, neque facere. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, magni odio magnam commodi sunt ipsum eum! Voluptas eveniet aperiam at maxime, iste id dicta autem odio laudantium eligendi commodi distinctio!</p>
                        </div>

                        <InfoProfile />                 
                    </div>
                    <div className="flex flex-col w-full 2xl:w-2/3">
                        <ExperienceProfile />
                        
                        <SkillsProfile />
                    </div>
                </div>
                <ConnectionsProfile />
            </div>
        </>
    )
}
