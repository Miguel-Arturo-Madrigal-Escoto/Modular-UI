
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
  } from 'react-swipeable-list';
  import 'react-swipeable-list/dist/styles.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onMatchCompany, onMatchUser, onRetrieveCompanyMatchesList, onRetrieveNextRecommendations, onRetrieveUserMatchesList } from '../../app/match/thunks';
import { defaultImageProfile } from '../../components/common/constants';
import { setActiveUserChat } from '../../app/chat/chatSlice';
import { ICompanyProfile, IUserProfile } from '../../app/types/interfaces';
import { SocketContext } from '../../context/SocketContext';
import EmptyCard from './EmptyCard';
import { LoadingScreen } from '../../components/common/LoadingScreen';


export const Card = () => {
    
    const { user_data } =  useAppSelector(state => state.auth);
    const { currentUser, currentCompany } =  useAppSelector(state => state.match);
    const { userMatches, companyMatches, loading } =  useAppSelector(state => state.match);
    const { positions, sectors } =  useAppSelector(state => state.form);

    const [user, setUser] = useState<IUserProfile | null>(null);
    const [company, setCompany] = useState<ICompanyProfile | null>(null);

    const { socket } = useContext(SocketContext);

    const dispatch =  useAppDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        if (currentUser){
            setUser(currentUser.user);
        }
        else setUser(null);
    }, [currentUser]);

    useEffect(() => {
        if (currentCompany){
            setCompany(currentCompany.company);
        } 
        else setCompany(null);
    }, [currentCompany]);

    const onMatchLikeCompany = async() => {   
        try {
            const matchData = await dispatch(onMatchCompany({
                like: true,
                user_id: user!.id
            })).unwrap();

            if (matchData.match){
                // redirect to the user (base_user) chat
                dispatch(setActiveUserChat(matchData.user));
   
                if (!companyMatches.find(u => u.base_user === matchData.user)){
                    dispatch(onRetrieveCompanyMatchesList());
                }

                // emit match event (socket)
                const newMatch = {
                    from: matchData.company,
                    to: matchData.user,
                }
                socket?.emit('new-match', newMatch);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onMatchDislikeCompany = async() => {
        try {
            await dispatch(onMatchCompany({
                like: false,
                user_id: user!.id
            })).unwrap();

        } catch (error) {
            
        }
    }

    const onMatchLikeUser = async() => {
        try {
            const matchData = await dispatch(onMatchUser({
                like: true,
                company_id: company!.id
            })).unwrap();

            if (matchData.match){
                // redirect to the company (base_user) chat
                dispatch(setActiveUserChat(matchData.company));
   
                // if (!matchedUsers.includes(matchData.company)){
                if (!userMatches.find(c => c.base_user === matchData.company)){
                    dispatch(onRetrieveUserMatchesList());
                }

                // emit match event (socket)
                const newMatch = {
                    from: matchData.user,
                    to: matchData.company,
                }
                socket?.emit('new-match', newMatch);
            }

        } catch (error) {
            
        }
    }

    const onMatchDislikeUser = async() => {
        try {
            await dispatch(onMatchUser({
                like: false,
                company_id: company!.id
            })).unwrap();
        } catch (error) {
            
        }
    }

    const swipeMatchLike = () => {
        if (user_data?.user){
            onMatchLikeUser();
        }
        else{
            onMatchLikeCompany();
        }
        dispatch(onRetrieveNextRecommendations());
    }

    const swipeMatchDislike = () => {
        if (user_data?.user){
            onMatchDislikeUser();
        }
        else{
            onMatchDislikeCompany();
        }
        dispatch(onRetrieveNextRecommendations());
    }

    const leadingActions = () => (
        <LeadingActions>
        <SwipeAction onClick={() => swipeMatchLike() }>
            ''
        </SwipeAction>
        </LeadingActions>
    );
    
    const trailingActions = () => (
        <TrailingActions>
        <SwipeAction
            onClick={() => swipeMatchDislike() }
        >
           ''
        </SwipeAction>
        </TrailingActions>
    );

    const onNavigateRecommendedProfile = () => {
        if (user_data?.user){
            localStorage.setItem('recommendedCompany', JSON.stringify(currentCompany));
        }
        else if (user_data?.company){
            localStorage.setItem('recommendedUser', JSON.stringify(currentUser));
        }
       
        navigate('/recommended-profile');
    }

    if (loading) {
        return <LoadingScreen />
    }

    return (
        <div className="h-screen bg-gray-200 flex justify-center items-center p-4">
            {
                (user || company) && !loading ? (
                <SwipeableList fullSwipe>
                <SwipeableListItem leadingActions={leadingActions()} trailingActions={trailingActions()} maxSwipe={1.0}>
                    <div className="max-w-md mx-auto md:max-w-2xl mt-16 min-w-0 break-words bg-white w-full shadow-lg rounded-xl">
                        <div className="px-6">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full flex justify-center">
                                    <div className="relative mt-2">
                                        <img src={ user?.image || company?.image || defaultImageProfile } className="w-40 h-40 border-4 border-black rounded-full"/>
                                    </div>
                                </div>
                                {
                                    user && (
                                        <div className="w-full text-center">
                                            <div className="flex justify-center lg:pt-4 pt-8 pb-0">
                                                <div className="p-3 text-center">
                                                    <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">{ user?.expected_salary }</span>
                                                    <span className="text-sm text-slate-400">Salario</span>
                                                </div>
                                                <div className="p-3 text-center">
                                                    <span className="text-xl font-bold block tracking-wide text-slate-700 capitalize">{ user?.modality }</span>
                                                    <span className="text-sm text-slate-400">Modalidad</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            <div className="text-center mt-2">
                                <h3 className="text-2xl text-slate-700 font-bold leading-normal">{ company?.name || user?.name  }</h3>
                                <h4 className="text-2xl text-slate-700 leading-normal mb-1">
                                    {  
                                        (user?.position) && positions.find(pos => pos.id === user.position)?.display 
                                        || (company?.sector) && sectors.find(sec => sec.id === company.sector)?.display }
                                </h4>
                                <div className="text-xs mb-2 text-slate-400 font-bold capitalize">
                                    { user?.location || company?.location }
                                </div>
                            </div>
                            <div className="mt-6 py-6 border-t border-slate-200 text-center">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full px-4">
                                        <a href="" className="font-normal text-slate-700 hover:text-slate-400">Acerca de</a>
                                        <p className="font-light leading-relaxed text-slate-600 mb-4">{  user?.about || company?.about }</p>
                                        <button className="font-normal text-slate-700 hover:text-slate-400" onClick={ onNavigateRecommendedProfile }>Ver perfil</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwipeableListItem>
                </SwipeableList>
                ) : 
                !user && !company && !loading && <EmptyCard/>
            }
        </div> 
    )
}
