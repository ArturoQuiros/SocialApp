import { useSelector, useDispatch } from "react-redux"
import mainApi from "../api/mainApi";
import Swal from "sweetalert2";
import { onLogoutAlbums } from "../store/app/albumSlice";
import { onLogoutPhotos } from "../store/app/photoSlice";
import { onLogoutStats } from "../store/app/statsSlice";
import { clearErrorMessage, onChecking, onLogin, onLogout, onUpdateUser } from "../store/auth/authSlice";

export const useAuthStore = () => {
  
    const dispatch = useDispatch();
  
    const {status, user, errorMessage} = useSelector(state => state.auth);

    const startLogin = async ({email, password}) => {
        dispatch(onChecking());
        try {
        
            const {data} = await mainApi.post('/users/login', {email, password});

            // localStorage.setItem('token', data.token);
            // localStorage.setItem('token-init-date', new Date().getTime());

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

            // localStorage.setItem('token', data.token);
            // localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(onLogin({firstName: data.firstName, 
                lastName: data.lastName, 
                email: data.email, 
                birthDate: data.birthDate, 
                gender: data.gender,
                uid: data.uid}));

        } catch (error) {
            //console.log(error);
            dispatch(onLogout(error.response.data?.message || 'Error'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const checkAuthToken = async() => {

        try { //Si no ha expirado el token, crea otro

            const {data} = await mainApi.get('/users/renew');
            //console.log("renewed");
            
            // localStorage.setItem('token', data.token);
            // localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(onLogin({firstName: data.firstName, 
                lastName: data.lastName, 
                email: data.email, 
                birthDate: data.birthDate, 
                gender: data.gender,
                uid: data.uid}));
            
        } catch (error) { //Si ya expiro el token, cierra sesion
            dispatch(onLogout());
        }
    }

    const startLogout = async () => {
        try { 

            const {data} = await mainApi.get('/users/logout');
            
        } catch (error) { 
            //console.log(error);
            Swal.fire('Error while logging out', error.response.data?.message, 'error');
        }
        dispatch(onLogoutAlbums());
        dispatch(onLogoutPhotos());
        dispatch(onLogoutStats());
        dispatch(onLogout());
    }

    const startUpdatingUser = async(newUser) => {

        try {

            await mainApi.put(`/users/${user.uid}`, newUser);
            dispatch(onUpdateUser({...newUser, uid: user.uid}));
            Swal.fire('User updated!', 'The user was updated successfully!', 'success');
            return;
            
        } catch (error) {
            //console.log(error);
            Swal.fire('Error while updating user', error.response.data?.message, 'error');
        }
        
    }

    const startUpdatingPassword = async(oldPassword, newPassword) => {

        try {

            try {
                await mainApi.post(`/users/checkpassword/${user.uid}`, {oldPassword});
            } catch (error) {
                //console.log(error);
                Swal.fire('Error while updating user password', error.response.data?.message, 'error');
                return false;
            }
 
            await mainApi.put(`/users/password/${user.uid}`, {newPassword});
            Swal.fire('User password updated!', 'The password was updated successfully!', 'success');
            return true;
            
        } catch (error) {
            //console.log(error);
            Swal.fire('Error while updating user password', error.response.data?.message, 'error');
            return false;
        }
        
    }

    const startForgotPassword = async (email) => {
        try {
        
            const {data} = await mainApi.post('/users/forgotpassword', {email});

            Swal.fire('New password sent!', 'Your new password was sent to your email successfully!', 'success');

        } catch (error) {
            //console.log(error);
            Swal.fire('Error while sending new user password', error.response.data?.message, 'error');
        }
    }

    return {
        status, 
        user, 
        errorMessage,
        startLogin,
        startSignUp,
        checkAuthToken,
        startLogout,
        startUpdatingUser,
        startUpdatingPassword,
        startForgotPassword
    }

}
