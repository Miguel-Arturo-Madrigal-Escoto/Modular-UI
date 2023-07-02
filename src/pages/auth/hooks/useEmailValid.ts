import { useEffect, useState } from 'react';
import validator from 'validator';


export const useEmailValid = (email = '') => {
    const [isEmailValid, setisEmailValid] = useState<boolean>(false);

    useEffect(() => {
        setisEmailValid(validator.isEmail(email))
    }, [email]);

    return {
        isEmailValid
    }
}
