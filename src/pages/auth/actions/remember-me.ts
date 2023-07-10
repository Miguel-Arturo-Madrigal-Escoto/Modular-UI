
export const rememberMe = (remember: boolean, email: string) => {
    if (remember){
        localStorage.setItem('email', email);
    } else {
        localStorage.removeItem('email');
    }
}