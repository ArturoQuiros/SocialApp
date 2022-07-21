const {response} = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const User = require("../models/users.model");
const HttpError = require('../models/http-error')
const { ReasonPhrases, StatusCodes } = require("http-status-codes")

const addUser = async (req, res = response, next) => { //add a user

    const {email, password} = req.body;

    try{

        let usuario = await User.findOne({email});

        if (usuario){
            return res.status(400).json({
                ok: false,
                msg: 'Email already registered',
            });
        }

        usuario = new User(req.body);

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        const token = await generarJWT(usuario.id, usuario.firstName, usuario.lastName, usuario.email, usuario.birthDate, usuario.gender);

        return res
        .cookie("token", token, {
          maxAge: 24*60*60*1000, //24h
          //sameSite: "none", //forces https
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({
            ok: true,
            uid: usuario.id,
            firstName: usuario.firstName,
            lastName: usuario.lastName,
            email: usuario.email,
            birthDate: usuario.birthDate,
            gender: usuario.gender
        });
    
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please talk to the admin',
        });
    }

}

const login = async (req, res = response, next) => {//login

    const { email, password } = req.body;

    try{

        const usuario = await User.findOne({email});

        if (!usuario){
            return res.status(400).json({
                ok: false,
                msg: 'Invalid credentials',
            });
        }

        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Invalid credentials',
            });
        }

        const token = await generarJWT(usuario.id, usuario.firstName, usuario.lastName, usuario.email, usuario.birthDate, usuario.gender);

        return res
        .cookie("token", token, {
          maxAge: 24*60*60*1000, //24h
          //sameSite: "none", //forces https
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({
            ok: true,
            uid: usuario.id,
            firstName: usuario.firstName,
            lastName: usuario.lastName,
            email: usuario.email,
            birthDate: usuario.birthDate,
            gender: usuario.gender
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please talk to the admin',
        });
    }

}

const revalidateToken = async (req, res = response) => {

    const {uid, firstName, lastName, email, birthDate, gender} = req;

    const token = await generarJWT(uid, firstName, lastName, email, birthDate, gender);

    return res
        .cookie("token", token, {
          maxAge: 24*60*60*1000, //24h
          //sameSite: "none", //forces https
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({
            ok: true,
            uid,
            firstName,
            lastName, 
            email, 
            birthDate, 
            gender
        });

}

const logout = async (req, res = response, next) => {

    return res
    .clearCookie("token")
    .status(200)
    .json({ message: "Successfully logged out" });

}

const checkPassword = async (req, res = response, next) => { //Check password by id

    const idParam = req.params.id;
    await checkAPassword(req,res,next,idParam);
    
}

const checkPassword2 = async (req, res = response, next) => { //Check password by id

    const idParam = req.query.id;
    await checkAPassword(req,res,next,idParam);

}

const checkAPassword = async (req, res = response, next, idParam) => {//Check password

    const { password } = req.body;

    try{

        const usuario = await User.findById(idParam).exec();

        if (!usuario){
            return res.status(400).json({
                ok: false,
                msg: 'Invalid user ID',
            });
        }

        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Invalid password',
            });
        }

        res.json({
            ok: true,
            uid: usuario.id,
            firstName: usuario.firstName,
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please talk to the admin',
        });
    }

}

const updateUser = async (req, res = response, next) => { //update a user by id

    const idParam = req.params.id;
    await updateAUser(req,res,next,idParam);
    
}

const updateUser2 = async (req, res = response, next) => { //update a user by id

    const idParam = req.query.id;
    await updateAUser(req,res,next,idParam);

}

const updateAUser = async (req, res = response, next, idParam) => {

    let oldUser;
    try{
        oldUser = await User.findById(idParam).exec();
    }catch(err){
        return next(new HttpError(err, 400))
    }



    let duplicate;

    try{
        duplicate = await User.find({_id: { $ne: idParam}, email: req.body.email}).exec();
    }catch(err){
        return next(new HttpError(err, 500))
    }

    if(duplicate[0]){
        return next(new HttpError("Email already exists", 422))
    }
    
    if (oldUser){

        const user = await User.findByIdAndUpdate(
            idParam,
            { 
                firstName: req.body.firstName, 
                lastName: req.body.lastName,
                email: req.body.email,
                password: oldUser.password, //Dont change the "password" here
                birthDate: req.body.birthDate,
                gender: req.body.gender,
            },
            {
              new: true,
            }
          ).exec();

        res.status(StatusCodes.OK).json({
            message: ReasonPhrases.OK,
            data: user,
        });
    }else{
        res.status(StatusCodes.NOT_FOUND).json({
            message: ReasonPhrases.NOT_FOUND
        });
    }

}

const updatePassword = async (req, res = response, next) => { //update a user password by id

    const idParam = req.params.id;
    await updateAUserPassword(req,res,next,idParam);
    
}

const updatePassword2 = async (req, res = response, next) => { //update a user password by id

    const idParam = req.query.id;
    await updateAUserPassword(req,res,next,idParam);
    
}

const updateAUserPassword = async (req, res = response, next, idParam) => {

    let oldUser;
    try{
        oldUser = await User.findById(idParam).exec();
    }catch(err){
        return next(new HttpError(err, 400))
    }
    
    if (oldUser){

        const pass = req.body.password;

        const salt = bcrypt.genSaltSync();
        const password = bcrypt.hashSync(pass, salt);

        const user = await User.findByIdAndUpdate(
            idParam,
            { password: password, },
            {
              new: true,
            }
          ).exec();


        res.status(StatusCodes.OK).json({
            message: ReasonPhrases.OK,
            data: "Password changed",
        });
    }else{
        res.status(StatusCodes.NOT_FOUND).json({
            message: ReasonPhrases.NOT_FOUND
        });
    }

}

const deleteUsers = async (req, res = response, next) => { //delete all users

    let result;
    try{
        result = await User.deleteMany({}).exec();
    }catch(err){
        return next(new HttpError("Not found", 400))
    }
    res.json(result);

}

exports.addUser = addUser;
exports.login = login;
exports.revalidateToken = revalidateToken;
exports.logout = logout;
exports.checkPassword = checkPassword;
exports.checkPassword2 = checkPassword2;
exports.updateUser = updateUser;
exports.updateUser2 = updateUser2;
exports.updatePassword = updatePassword;
exports.updatePassword2 = updatePassword2;
exports.deleteUsers = deleteUsers;