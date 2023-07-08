import { useEffect, useState } from 'react';

export const useUserOrCompany = (option = 'user') => {
    const [isUser, setIsUser] = useState<boolean>(false);

    useEffect(() => {
        setIsUser(option === "user")
    }, [option]);

    return {
        isUser
    }
}