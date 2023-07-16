import NavBar from './pages/home/NavBar'
import { AppRouter } from './routes/AppRouter'


export const App = () => {

    const currentPage = window.location.pathname;
    const excludedPages = ['/login', '/register'];
    const isNavBarShown = !excludedPages.includes(currentPage);

    return (
        <>
            {isNavBarShown && <NavBar />}
            <AppRouter />
        </>
    )
}



