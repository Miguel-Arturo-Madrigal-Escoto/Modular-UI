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
            </Routes>
        </Router>
    )
}