import {
    Routes,
    Route,
    useLocation,
} from 'react-router-dom';
import { ForYou } from '../pages/home/ForYou';
import { Profile } from '../pages/home/Profile';
import { Matches } from '../pages/matches/Matches';
import { Register } from '../pages/auth/Register';
import { Login } from '../pages/auth/Login';
import { Messages } from '../pages/messages/Messages';
import { GoogleOAuth2 } from '../pages/auth/GoogleOAuth2';
import { LinkedinOAuth2 } from '../pages/auth/LinkedinOAuth2';
import { GithubOAuth2 } from '../pages/auth/GithubOAuth2';
import { ProfileForm } from '../pages/auth/ProfileForm';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useEffect, useState, useContext } from 'react';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { UserActivation } from '../pages/auth/UserActivation';
import { onGetCurrentUserData, onRefreshJWT } from '../app/auth/thunks';
import { NavBar } from '../pages/home/NavBar';
import { fetchFormData } from '../app/form/thunks';
import { onGetUserExperiences } from '../app/experience/thunks';
import { onGetUserSkills } from '../app/skill/thunks';
import LandingPage from '../pages/home/LandingPage';
import { SocketContext } from '../context/SocketContext';

import { onRetrieveCompanyMatchesList, onRetrieveNextRecommendations, onRetrieveUserMatchesList } from '../app/match/thunks';
import { RecommendedProfile } from '../pages/matches/RecommendedProfile';
import { saveLocalStorageState } from '../app/helpers/saveLocalStorageState';


export const AppRouter = () => {
    const { user, access, refresh, user_data } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const { socket } = useContext(SocketContext);

    const location = useLocation();
    const regex = new RegExp('\/(login|register|profile\/form)\/?', 'g');
    const [isNavBarShown, setisNavBarShown] = useState(false);

    // const storageRecommendedCompany = JSON.parse(localStorage.getItem('recommendedCompany') || 'null') || null
    const storageRecommendedUser = JSON.parse(localStorage.getItem('recommendedUser') || 'null') || null

    // Get next recommendations (users/company)
    useEffect(() => {
        if (user_data?.user|| user_data?.company){
            dispatch(onRetrieveNextRecommendations());
        }            
    }, [user_data]);

    // update the auth variables in localStorage
    useEffect(() => {
        saveLocalStorageState({ user, access, refresh });
    }, [user, access, refresh]);

    //  Retrieve user/company data
    useEffect(() => {
        if (access){
            dispatch(onGetCurrentUserData({ access }));
        }

    }, [access]);


    // Authenticated user - skills & experiences
    useEffect(() => {
        const user_id = user_data?.user?.id || storageRecommendedUser?.user?.id;

        if (user_id){
            dispatch(onGetUserSkills({
                user_id: user_id 
            }));
            dispatch(onGetUserExperiences({
                user_id: user_id 
            }));
        }

    }, [user_data, localStorage.getItem('recommendedUser')]);


    // Current user/company matches list
    useEffect(() => {
        if (user_data || location.pathname.includes('matches')){
            if (user_data?.user){
                dispatch(onRetrieveUserMatchesList());
            }
            else {
                dispatch(onRetrieveCompanyMatchesList());
            }
        }

    }, [user_data, location.pathname]);

    // Hide/show navbar
    useEffect(() => {
        setisNavBarShown(!regex.test(location.pathname));
    }, [location.pathname]);

    
    // Fetch data to fill form components such as <select>
    useEffect(() => {
        if (access){
            dispatch(fetchFormData());
        }
    }, [access]);
    
    // Refresh JWT
    useEffect(() => {
        if (refresh && access && user){
            dispatch(onRefreshJWT({
                refresh,
            }))
        }
    }, [refresh]);

    // Websockets connect & disconnect events
    useEffect(() => {
        if (access){
            socket?.connect()
        }
        else {
            socket?.disconnect()
        }

        return () => {
            socket?.disconnect();
        }
    }, [access]);

    return (
        <>
            {
                isNavBarShown && user && <NavBar />
            }
            <Routes>
                <Route path='/' element={
                    <PublicRoute>
                        <LandingPage />
                    </PublicRoute>
                } />
                <Route path='/for-you' element={ 
                    <PrivateRoute>
                        <ForYou />
                    </PrivateRoute>
                } />

                <Route path='/matches' element={ 
                    <PrivateRoute>
                        <Matches />
                    </PrivateRoute>
                } />

                <Route path='/register' element={
                    <PublicRoute>
                        <Register />
                    </PublicRoute>
                } />

                <Route path='/login' element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                } />

                <Route path='/messages' element={ 
                    <PrivateRoute>
                        <Messages />
                    </PrivateRoute>
                } />

                <Route path='/auth/oauth2/google' element={ 
                    <PublicRoute>
                        <GoogleOAuth2 />
                    </PublicRoute>
                } />

                <Route path='/auth/oauth2/linkedin' element={ 
                    <PublicRoute>
                        <LinkedinOAuth2 />
                    </PublicRoute>
                } />

                <Route path='/auth/oauth2/github' element={ 
                    <PublicRoute>
                        <GithubOAuth2 />
                    </PublicRoute>
                } />

                <Route path='/register/activate/:uid/:token' element={ 
                    <PublicRoute>
                        <UserActivation />
                    </PublicRoute>
                } />

                <Route path='/profile' element={ 
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>
                } />

                <Route path='/recommended-profile' element={ 
                    <PrivateRoute>
                        <RecommendedProfile />
                    </PrivateRoute>
                } />

                <Route path='/profile/form' element={ 
                    <ProfileForm />
                } />
                
                
            </Routes>
        </>
    )
}