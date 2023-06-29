interface ILogin {
    email: string;
    password: string;
}

interface IGoogleSucessLogin {
    access_token: string;
    refresh_token: string;
    user: string;
}

interface IRegister {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}