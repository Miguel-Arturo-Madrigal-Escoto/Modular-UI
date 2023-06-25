import { FC, useEffect } from 'react'
import { axios_config } from './api/axios_config';

interface Props {
  name: string;
  lastname: string;
  edad: number;
  isVerified: boolean;
}

export interface APIResponse {
  username: string;
  email:    string;
  user:     null;
  company:  null;
}


export const User: FC<Props> = ({ name, lastname, edad, isVerified }) => {

    useEffect(() => { 
        axios_config.post<APIResponse>('auth/users/', {
            username: 'xdxdxd',
            email: 'xdxdxd@gmail.com',
            password: 'Fortnite123..'
        }, {
          headers: {
            'CONTENT-TYPE': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
          }
        }) 
        .then((res) => {
          console.log(res.status)
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err.response)
        })
    }, [])

    return (
        <>
          <p>Nombre: {name}</p>
          <p>Lastname: {lastname}</p>
          <p>Edad: {edad}</p>
          <p>
            {isVerified && 'Usuario verificado' }
          </p>
        </>
    )
}
