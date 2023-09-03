import { useAppSelector } from '../../app/hooks'
import { UserMatch } from './UserMatch'
import { CompanyMatch } from './CompanyMatch';


export const Matches = () => {

    const { user_data } = useAppSelector(state => state.auth);
    const { userMatches, companyMatches } = useAppSelector(state => state.match);

    return (
        <>
            <div className="bg-gray-200 h-screen py-5">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Listado de matches
                    </h2>
                </div>
                {
                    user_data?.user 
                    ?  userMatches.map(company => <UserMatch company={ company } key={ company.id }/>)
                    :  companyMatches.map(user => <CompanyMatch  user={ user } key={ user.id }/>)
                }
            </div>
        </>
    )
}
