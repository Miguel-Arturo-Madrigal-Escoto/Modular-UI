
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRouter } from './routes/AppRouter'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {   
    


    return (
        <Router>
            <AppRouter />
            <ToastContainer />
        </Router>
    )
}



