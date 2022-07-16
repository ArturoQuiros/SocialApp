import { useSelector, useDispatch } from "react-redux"
import mainApi from "../api/mainApi";
import { onLogoutAlbums } from "../store/app/albumSlice";
import { onLogoutPhotos } from "../store/app/photoSlice";
import { onLogoutStats } from "../store/app/statsSlice";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice";

export const useAuthStore = () => {
  
    const dispatch = useDispatch();
  
    const {status, user, errorMessage} = useSelector(state => state.auth);

    const startLogin = async ({email, password}) => {
        dispatch(onChecking());
        try {
        
            const {data} = await mainApi.post('/users/login', {email, password});

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(onLogin({firstName: data.firstName, 
                            lastName: data.lastName, 
                            email: data.email, 
                            birthDate: data.birthDate, 
                            gender: data.gender,
                            uid: data.uid}));

        } catch (error) {
            //console.log(error);
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const startSignUp = async ({firstName, lastName, email, password, birthDate, gender}) => {
        dispatch(onChecking());
        try {
            
            const {data} = await mainApi.post('/users/signup', {firstName, lastName, email, password, birthDate, gender});

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(onLogin({firstName: data.firstName, 
                lastName: data.lastName, 
                email: data.email, 
                birthDate: data.birthDate, 
                gender: data.gender,
                uid: data.uid}));

        } catch (error) {
            //console.log(error);
            dispatch(onLogout(error.response.data?.msg || 'Error'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const checkAuthToken = async() => {

        const token = localStorage.getItem('token');

        if (!token) return dispatch(onLogout());

        try { //Si no ha expirado el token, crea otro

            const {data} = await mainApi.get('/users/renew');
            
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(onLogin({firstName: data.firstName, 
                lastName: data.lastName, 
                email: data.email, 
                birthDate: data.birthDate, 
                gender: data.gender,
                uid: data.uid}));
            
        } catch (error) { //Si ya expiro el token, cierra sesion
            localStorage.clear();
            dispatch(onLogout());
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogoutAlbums());
        dispatch(onLogoutPhotos());
        dispatch(onLogoutStats());
        dispatch(onLogout());
    }

    return {
        status, 
        user, 
        errorMessage,
        startLogin,
        startSignUp,
        checkAuthToken,
        startLogout,
    }

}
