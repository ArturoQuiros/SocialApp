import { Grid, Typography, TextField, Button, Link, Alert, Select, MenuItem, FormControl, InputLabel, FormHelperText } from "@mui/material"
import { useEffect, useState } from "react";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useForm } from "../../hooks/useForm";
import { AuthLayoutApp } from "../layout/AuthLayoutApp";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.js';

const userFormFields = {
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    gender: '',
}

const passwordFormFields = {
    oldPassword: '',
    newPassword: '',
    newPassword2: '',
}

const formValidationsUser = {
    firstName: [ (value) => value.length >= 1, 'The first name is required'],
    lastName: [ (value) => value.length >= 1, 'The last name is required'],
    birthDate: [ (value) => value.length >= 1, 'The birth date is required'],
    gender: [ (value) => value.length >= 1, 'The gender is required'],
    email: [ (value) => value.includes('@'), 'The email must have a @'],
}

const formValidationsPassword = {
    oldPassword: [ (value) => value.length >= 1, 'You must enter the old password'],
    newPassword: [ (value) => value.length >= 8, 'The new password must be at least 8 characters long'],
    newPassword2: [ (value) => value.length >= 1, 'You must enter the new password again'],
}

export const SettingsPage = () => {

    const {user, startUpdatingUser, startUpdatingPassword} = useAuthStore();

    const [formSubmitted1, setFormSubmitted1] = useState(false);
    const [formSubmitted2, setFormSubmitted2] = useState(false);

    const {formState: formStateUser, firstName, lastName, email, birthDate, gender, onInputChange: onUserInputChange,
        isFormValid: isFormValidUser, firstNameValid, lastNameValid, emailValid, birthDateValid, genderValid, setFormState} = useForm(userFormFields, formValidationsUser);

    const {formState: formStatePassword, oldPassword, newPassword, newPassword2, onInputChange: onPasswordInputChange,
        isFormValid: isFormValidPassword, oldPasswordValid, newPasswordValid, newPassword2Valid, onResetForm} = useForm(passwordFormFields, formValidationsPassword);

    useEffect(() => {
      
        setFormState({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            birthDate: user.birthDate.substring(0,10),
            gender: user.gender,
        })

    }, [])
            

    const onSubmitUser = (e) => {
        e.preventDefault();
        setFormSubmitted1(true);

        if (!isFormValidUser) return;

        startUpdatingUser({firstName, lastName, email, birthDate, gender});
    }

    const onSubmitPassword = async(e) => {
        e.preventDefault();
        setFormSubmitted2(true);

        if (!isFormValidPassword) return;

        if (newPassword !== newPassword2) {
            Swal.fire('Update Error', 'The new passwords do not match', 'error');
            return;
        }

        const result = await startUpdatingPassword(oldPassword, newPassword);
        if(result){
            onResetForm();
            setFormSubmitted2(false);
        }
        
    }

    return (
        <div className=" mt-4">
            <AuthLayoutApp title="Update User">
                {/* <h1>{formStateUser ? 'Valido' : 'Incorrecto'}</h1> */}

                <form onSubmit={onSubmitUser}>
                    <Grid container>
                        <Grid item xs={12} sx={{mt: 2}}>
                            <TextField variant="filled" label="First name" type="text" placeholder="Your first name" fullWidth 
                            name="firstName" value={firstName} onChange={onUserInputChange} 
                            error={!!firstNameValid && formSubmitted1} helperText={formSubmitted1 && firstNameValid} />
                        </Grid>
                        <Grid item xs={12} sx={{mt: 2}}>
                            <TextField variant="filled" label="Last name" type="text" placeholder="Your last name" fullWidth 
                            name="lastName" value={lastName} onChange={onUserInputChange} 
                            error={!!lastNameValid && formSubmitted1} helperText={formSubmitted1 && lastNameValid} />
                        </Grid>
                        <Grid item xs={12} sx={{mt: 2}}>
                            <TextField variant="filled" label="Email" type="email" placeholder="email@email.com" fullWidth 
                            name="email" value={email} onChange={onUserInputChange} 
                            error={!!emailValid && formSubmitted1} helperText={formSubmitted1 && emailValid} />
                        </Grid>
                        <Grid item xs={12} sx={{mt: 4}}>
                            <InputLabel sx={{ml: 1}} htmlFor="bootstrap-input">
                                Birthday:
                            </InputLabel>
                            <TextField variant="filled" id="bootstrap-input" type="date" fullWidth 
                            name="birthDate" value={birthDate} onChange={onUserInputChange} 
                            error={!!birthDateValid && formSubmitted1} helperText={formSubmitted1 && birthDateValid} />
                        </Grid>
                        <Grid item xs={12} sx={{mt: 2}}>
                            <FormControl variant="filled" fullWidth>
                                <InputLabel id="gender-label">Gender</InputLabel>
                                <Select
                                    labelId="gender-label"
                                    value={gender}
                                    label="Gender"
                                    name="gender"
                                    onChange={onUserInputChange}
                                    error={!!genderValid && formSubmitted1} 
                                >
                                    <MenuItem value={"M"}>Male</MenuItem>
                                    <MenuItem value={"F"}>Female</MenuItem>
                                </Select>
                                <FormHelperText error>{formSubmitted1 && genderValid}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
                            <Grid item xs={12}>
                                <Button variant="contained" fullWidth type="submit">
                                    Update user
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>

            </AuthLayoutApp>

            <AuthLayoutApp title="Update Password">
                {/* <h1>{formStatePassword ? 'Valido' : 'Incorrecto'}</h1> */}

                <form onSubmit={onSubmitPassword}>
                    <Grid container>
                        <Grid item xs={12} sx={{mt: 2}}>
                            <TextField variant="filled" label="Old Password" type="password" placeholder="Your old password" fullWidth 
                            name="oldPassword" value={oldPassword} onChange={onPasswordInputChange} 
                            error={!!oldPasswordValid && formSubmitted2} helperText={formSubmitted2 && oldPasswordValid} />
                        </Grid>
                        <Grid item xs={12} sx={{mt: 2}}>
                            <TextField variant="filled" label="New Password" type="password" placeholder="Your new password" fullWidth 
                            name="newPassword" value={newPassword} onChange={onPasswordInputChange} 
                            error={!!newPasswordValid && formSubmitted2} helperText={formSubmitted2 && newPasswordValid} />
                        </Grid>
                        <Grid item xs={12} sx={{mt: 2}}>
                            <TextField variant="filled" label="Repeat New Password" type="password" placeholder="Your new password again" fullWidth 
                            name="newPassword2" value={newPassword2} onChange={onPasswordInputChange} 
                            error={!!newPassword2Valid && formSubmitted2} helperText={formSubmitted2 && newPassword2Valid} />
                        </Grid>
                        <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
                            <Grid item xs={12}>
                                <Button variant="contained" fullWidth type="submit">
                                    Update password
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>

            </AuthLayoutApp>
        </div>
    )
}
