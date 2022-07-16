import { Grid, Typography, TextField, Button, Link, Alert, Select, MenuItem, FormControl, InputLabel, FormHelperText } from "@mui/material"
import {Link as RouterLink} from 'react-router-dom'
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks/useForm"
import { useEffect, useMemo, useState } from "react"
import Swal from 'sweetalert2';
import { useAuthStore } from '../../hooks/useAuthStore'

const formData = {
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: '',
    email: '',
    password: '',
    password2: ''
}

const formValidations = {
    firstName: [ (value) => value.length >= 1, 'The first name is required'],
    lastName: [ (value) => value.length >= 1, 'The last name is required'],
    birthDate: [ (value) => value.length >= 1, 'The birth date is required'],
    gender: [ (value) => value.length >= 1, 'The gender is required'],
    email: [ (value) => value.includes('@'), 'The email must have a @'],
    password: [ (value) => value.length >= 8, 'The password must be at least 8 characters long'],
    password2: [ (value) => value.length >= 1, 'You must enter the password again'],
}

export const SignUpPage = () => {

    const {status, errorMessage, startSignUp} = useAuthStore();

    const [formSubmitted, setFormSubmitted] = useState(false);

    const {formState, firstName, lastName, email, password, password2, birthDate, gender, onInputChange,
            isFormValid, firstNameValid, lastNameValid, emailValid, passwordValid, password2Valid, birthDateValid, genderValid} = useForm(formData, formValidations);

    const isAuthenticating = useMemo(() => status === 'checking', [status]);

    const onSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);

        if (!isFormValid) return;

        if (password !== password2) {
            Swal.fire('Error en registro', 'Las contrasenas no son iguales', 'error');
            return;
        }

        startSignUp({firstName, lastName, email, password, birthDate, gender});
    }


    return (

        <AuthLayout title="Sign Up">
            {/* <h1>{isFormValid ? 'Valido' : 'Incorrecto'}</h1> */}

            <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
                <Grid container>
                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField variant="filled" label="First name" type="text" placeholder="Your first name" fullWidth 
                        name="firstName" value={firstName} onChange={onInputChange} 
                        error={!!firstNameValid && formSubmitted} helperText={formSubmitted && firstNameValid} />
                    </Grid>
                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField variant="filled" label="Last name" type="text" placeholder="Your last name" fullWidth 
                        name="lastName" value={lastName} onChange={onInputChange} 
                        error={!!lastNameValid && formSubmitted} helperText={formSubmitted && lastNameValid} />
                    </Grid>
                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField variant="filled" label="Email" type="email" placeholder="email@email.com" fullWidth 
                        name="email" value={email} onChange={onInputChange} 
                        error={!!emailValid && formSubmitted} helperText={formSubmitted && emailValid} />
                    </Grid>
                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField variant="filled" label="Password" type="password" placeholder="Your password" fullWidth 
                        name="password" value={password} onChange={onInputChange} 
                        error={!!passwordValid && formSubmitted} helperText={formSubmitted && passwordValid} />
                    </Grid>
                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField variant="filled" label="Repeat Password" type="password" placeholder="Your password again" fullWidth 
                        name="password2" value={password2} onChange={onInputChange} 
                        error={!!password2Valid && formSubmitted} helperText={formSubmitted && password2Valid} />
                    </Grid>
                    <Grid item xs={12} sx={{mt: 4}}>
                        <InputLabel sx={{ml: 1}} htmlFor="bootstrap-input">
                            Birthday:
                        </InputLabel>
                        <TextField variant="filled" id="bootstrap-input" type="date" fullWidth 
                        name="birthDate" value={birthDate} onChange={onInputChange} 
                        error={!!birthDateValid && formSubmitted} helperText={formSubmitted && birthDateValid} />
                    </Grid>
                    <Grid item xs={12} sx={{mt: 2}}>
                        <FormControl variant="filled" fullWidth>
                            <InputLabel id="gender-label">Gender</InputLabel>
                            <Select
                                labelId="gender-label"
                                value={gender}
                                label="Gender"
                                name="gender"
                                onChange={onInputChange}
                                error={!!genderValid && formSubmitted} 
                            >
                                <MenuItem value={"M"}>Male</MenuItem>
                                <MenuItem value={"F"}>Female</MenuItem>
                            </Select>
                            <FormHelperText error>{formSubmitted && genderValid}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
                        <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
                            <Alert severity='error'>{errorMessage}</Alert>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" fullWidth type="submit" disabled={isAuthenticating}>
                                Create account
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction="row" justifyContent="end">
                    <Typography sx={{mr: 1}}>Already have an account?</Typography>
                        <Link component={RouterLink} color="inherit" to="/auth/login">
                            Login
                        </Link>
                        
                    </Grid>
                </Grid>
            </form>

        </AuthLayout>

    )
}
