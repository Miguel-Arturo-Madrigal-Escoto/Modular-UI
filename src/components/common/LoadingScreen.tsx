import { FC } from 'react';
import '../../sass/loading_screen.scss';


export const LoadingScreen: FC = () => {
    return (
        <div className='loader-container'>
            <div className="loader">
                <div className="loader__bar"></div>
                <div className="loader__bar"></div>
                <div className="loader__bar"></div>
                <div className="loader__bar"></div>
                <div className="loader__bar"></div>
                <div className="loader__ball"></div>
            </div>  
        </div>
    )
}
