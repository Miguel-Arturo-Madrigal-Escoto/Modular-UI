
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRouter } from './routes/AppRouter'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SocketContext } from './context/SocketContext';
import { useSocket } from './socket/useSocket';


export const App = () => {   
    
    const { socket, online, socketConnect, socketDisconnect } = useSocket(
        import.meta.env.DEV ? import.meta.env.VITE_CHAT_URL_DEV : import.meta.env.VITE_CHAT_URL_PROD,
    );


    return (
        <Router>
                <SocketContext.Provider value={{ socket, online, socketConnect, socketDisconnect }}>
                    <AppRouter />
                    <ToastContainer />
                </SocketContext.Provider>
        </Router>
    )
}



