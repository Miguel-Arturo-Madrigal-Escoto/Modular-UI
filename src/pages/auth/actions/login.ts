import { axios_base } from '../../../api/axios_base'
import { IAuthorizationRedirect } from '../types/interfaces';

export const host = window.location.origin;

console.log('host: ',host)

export const onGoogleAuthenticate = async () => {
    const resp = await axios_base.get<IAuthorizationRedirect>(`auth/o/google-oauth2/?redirect_uri=${'https://jobbie-modular.netlify.app'}/auth/oauth2/google/`)
    window.location.replace(resp.data.authorization_url)
}

export const onLinkedinAuthenticate = async () => {
    const resp = await axios_base.get<IAuthorizationRedirect>(`auth/o/linkedin-oauth2/?redirect_uri=${host}/auth/oauth2/linkedin/`)
    window.location.replace(resp.data.authorization_url)
}

export const onGithubAuthenticate = async () => {
    const resp = await axios_base.get<IAuthorizationRedirect>(`auth/o/github/?redirect_uri=${host}/auth/oauth2/github/`)
    window.location.replace(resp.data.authorization_url)
}