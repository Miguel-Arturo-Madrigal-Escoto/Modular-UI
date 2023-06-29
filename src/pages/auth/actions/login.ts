import { axios_base } from '../../../api/axios_base'

export const onGoogleAuthenticate = async () => {
    const resp = await axios_base.get('http://127.0.0.1:8000/auth/o/google-oauth2/?redirect_uri=http://127.0.0.1:5173/auth/oauth2/google/')
    window.location.replace(resp.data.authorization_url)
}