import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useForm } from '../../hooks/useForm';
import {Link as RouterLink} from 'react-router-dom'
import { Grid, Typography, TextField, Button, Link, Alert } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout';

const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
}

export const LoginPage = () => {

    const {startLogin, errorMessage} = useAuthStore();

    const {loginEmail, loginPassword, onInputChange: onLoginInputChange} = useForm(loginFormFields);

    const onSubmit = (e) => {
        e.preventDefault();

        startLogin({email: loginEmail, password: loginPassword});
    }

    useEffect(() => {
      
        if (errorMessage !== undefined) {
            Swal.fire('Error en la autenticacion', errorMessage, 'error');
        }

    }, [errorMessage])
    

    return (
        <AuthLayout title="Login">

            <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
                <Grid container>
                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField variant="filled" label="Email" type="text" placeholder="Your email" fullWidth name="loginEmail" value={loginEmail} onChange={onLoginInputChange} />
                    </Grid>
                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField variant="filled" label="Password" type="password" placeholder="Your password" fullWidth name="loginPassword" value={loginPassword} onChange={onLoginInputChange}/>
                    </Grid>
                    <Grid item xs={12} sx={{mt: 2}} display={!!errorMessage ? '' : 'none'}>
                        <Alert severity='error'>{errorMessage}</Alert>
                    </Grid>
                    <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
                        <Grid item xs={12} sm={12}>
                            <Button variant="contained" fullWidth type="submit" >
                                Login
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction="row" justifyContent="end">
                        <Link component={RouterLink} color="inherit" to="/auth/signup">
                            Create an account
                        </Link>
                        
                    </Grid>
                </Grid>
            </form>

        </AuthLayout>
    )
}