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


export const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path='/for-you' element={ <ForYou /> } />
                <Route path='/profile' element={ <Profile /> } />
                <Route path='/profile/edit' element={ <ProfileEdit /> } />
                <Route path='/matches' element={ <Matches /> } />
                <Route path='/register' element={ <Register /> } />
                <Route path='/login' element={ <Login /> } />
                <Route path='/messages' element={ <Messages /> } />
                <Route path='/auth/oauth2/google' element={ <GoogleOAuth2 /> } />
                <Route path='/auth/oauth2/linkedin' element={ <LinkedinOAuth2 /> } />
                <Route path='/auth/oauth2/github' element={ <GithubOAuth2 /> } />

                <Route path='/profile/form' element={ <ProfileForm/> } />
            </Routes>
        </Router>
    )
}