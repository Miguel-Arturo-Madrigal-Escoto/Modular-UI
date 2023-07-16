import { useAppSelector } from './app/hooks';
import NavBar from './pages/home/NavBar'
import { AppRouter } from './routes/AppRouter'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


export const App = () => {
    const currentPage = window.location.pathname;
    const regex = new RegExp('\/(login|register|profile\/form)\/?', 'g')
    const isNavBarShown = !regex.test(currentPage);
    const { user } = useAppSelector(state => state.auth);

    return (
        <>
            {isNavBarShown && user && <NavBar />}
            <AppRouter />
            <ToastContainer />
        </>
    )
}



