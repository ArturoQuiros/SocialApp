const express = require("express")
const {check} = require('express-validator');
const router = express.Router();

const usersController = require('../controllers/users.controller')
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { isDate } = require('../helpers/isDate');

router.post(
    '/signup', 
    [ 
        check('firstName', 'First name is required').not().isEmpty(),
        check('lastName', 'Last name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must be at least 8 characters long').isLength({min: 8}),
        check('birthDate', 'Invalid birth date').custom(isDate),
        check('gender', 'Gender is required').not().isEmpty(),
        validarCampos
    ], 
    usersController.addUser);

router.post(
    '/login', 
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must be at least 8 characters long').isLength({min: 8}),
        validarCampos
    ], 
    usersController.login);

router.post(
    '/forgotpassword', 
    [
        check('email', 'Email is required').isEmail(),
        validarCampos
    ], 
    usersController.forgotPassword);

router.get('/renew', validarJWT, usersController.revalidateToken);

router.use(validarJWT); //Se aplica este middleware a las siguientes 5 rutas porque esta antes de las 5

router.get('/logout', usersController.logout);

router.post("/checkpassword/:id", 
    [
        check('oldPassword', 'Old Password must be at least 8 characters long').isLength({min: 8}),
        validarCampos
    ], usersController.checkPassword);
router.post("/checkpassword/", 
    [
        check('oldPassword', 'Old Password must be at least 8 characters long').isLength({min: 8}),
        validarCampos
    ], usersController.checkPassword2);

router.put("/password/:id", 
    [
        check('newPassword', 'New Password must be at least 8 characters long').isLength({min: 8}),
        validarCampos
    ], usersController.updatePassword);
router.put("/password/", 
    [
        check('newPassword', 'New Password must be at least 8 characters long').isLength({min: 8}),
        validarCampos
    ], usersController.updatePassword2);
router.put("/:id", 
    [ 
        check('firstName', 'First name is required').not().isEmpty(),
        check('lastName', 'Last name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('birthDate', 'Birth date incorrect').custom(isDate),
        check('gender', 'Gender is required').not().isEmpty(),
        validarCampos
    ],  usersController.updateUser);
router.put("/", [ 
        check('firstName', 'First name is required').not().isEmpty(),
        check('lastName', 'Last name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('birthDate', 'Birth date incorrect').custom(isDate),
        check('gender', 'Gender is required').not().isEmpty(),
        validarCampos
    ],  usersController.updateUser2);



//router.delete("/", usersController.deleteUsers); //Just for backend development, comment when backend is done

module.exports = router;