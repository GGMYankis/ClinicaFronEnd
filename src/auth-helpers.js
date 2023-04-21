
import Cookies from 'universal-cookie';
import axios from 'axios';
const cookies = new Cookies();



export function setToken(token) {
    return cookies.set('MyCookies', token, { path: '/' });
}

export function setUsuarioM(usuario) {

    return cookies.set('Usuario', usuario, { path: '/' });
}

export function setUsuario(user) {
    return cookies.set('UsuarioDatos', user, { path: '/' });
}

export function getDatosUsuario() {

    return cookies.get('UsuarioDatos');
}




export function obtenerUser() {

    return cookies.get('Usuario');
}


export function getToken() {

    return cookies.get('MyCookies')
}


export function deleteToken() {


    cookies.remove('MyCookies')
    cookies.remove('Usuario')

    return;
}

export function initAxiosInterceptors() {
    axios.interceptors.request.use(function (config) {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `bearer ${token}`
        }

        return config;
    })

    /*

    axios.interceptors.response.use(
        function (response) {
            return response;
        }
        ,
        function (error) {
            if (error.response.status === 401) {
                console.log("el token ha vencido")
                deleteToken();
            } else {
                return Promise.reject(error)
            }
        }
    )
    */
}