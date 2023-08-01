
import { useAppSelector } from '../../app/hooks'
import { LoadingScreen } from '../../components/common/LoadingScreen';
import { Navigate } from 'react-router-dom';
import { Card } from '../matches/Card';

export const ForYou = () => {
    const { loading } = useAppSelector(state => state.auth);
   
    return (
        <>          
            {
                loading ? (
                    <LoadingScreen />
                ) : (
                    <Card />
                )
            }     
        </>
    )
}
