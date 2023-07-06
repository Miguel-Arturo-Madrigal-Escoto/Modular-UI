import { FC } from 'react';
import { BallTriangle as Icon } from 'react-loading-icons'

interface Props {
    loading: boolean
}

export const LoadingIcon: FC<Props> = ({ loading }) => {
    return (
        <div style={{
            'width': '100vw',
            'height': '100vh',
            'display': 'flex',
            'flexDirection': 'column',
            'justifyContent': 'center',
            'alignItems': 'center',
        }}>
            {
                loading && (
                    <>
                        <Icon stroke="#0047AB" speed={.75}  />
                        <p style={{ color: '#0047AB' }}>Cargando...</p>
                    </>
                )
            }
        </div>   
    )
}
