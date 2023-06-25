import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import { ForYou } from '../components/home/ForYou';
import { Profile } from '../components/home/Profile';
import { ProfileEdit } from '../components/home/ProfileEdit';
import { Matches } from '../components/matches/Matches';
import { Register } from '../components/auth/Register';
import { Login } from '../components/auth/Login';
import { Messages } from '../components/messages/Messages';

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
            </Routes>
        </Router>
    )
}