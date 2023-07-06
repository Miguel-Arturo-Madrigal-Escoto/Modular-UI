import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import { ForYou } from '../pages/home/ForYou';
import { Profile } from '../pages/home/Profile';
import { ProfileEdit } from '../pages/home/ProfileEdit';
import { Matches } from '../pages/matches/Matches';
import { Register } from '../pages/auth/Register';
import { Login } from '../pages/auth/Login';
import { Messages } from '../pages/messages/Messages';
import { GoogleOAuth2 } from '../pages/auth/GoogleOAuth2';
import { LinkedinOAuth2 } from '../pages/auth/LinkedinOAuth2';
import { GithubOAuth2 } from '../pages/auth/GithubOAuth2';
import { ProfileForm } from '../pages/auth/ProfileForm';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useEffect } from 'react';
import { logout } from '../app/auth/authSlice';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';


export const AppRouter = () => {

    const authState = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {


    }, [authState]);

    return (
        <Router>
            <Routes>
                <Route path='/for-you' element={ 
                    <PrivateRoute user={authState.user}>
                        <ForYou />
                    </PrivateRoute>
                } />
                <Route path='/profile' element={ <Profile /> } />
                <Route path='/profile/edit' element={ <ProfileEdit /> } />
                <Route path='/matches' element={ <Matches /> } />
                <Route path='/register' element={ <Register /> } />
                <Route path='/login' element={ <Login /> } />
                <Route path='/messages' element={ <Messages /> } />
                <Route path='/auth/oauth2/google' element={ 
                    <PublicRoute user={authState.user}>
                        <GoogleOAuth2 />
                    </PublicRoute>
                } />
                <Route path='/auth/oauth2/linkedin' element={ 
                    <PublicRoute user={authState.user}>
                        <LinkedinOAuth2 />
                    </PublicRoute>
                } />
                <Route path='/auth/oauth2/github' element={ 
                    <PublicRoute user={authState.user}>
                        <GithubOAuth2 />
                    </PublicRoute>
                } />

                <Route path='/profile/form' element={ <ProfileForm/> } />
            </Routes>
        </Router>
    )
}