const User = require("../models/users.model");
const HttpError = require('../models/http-error')
const { ReasonPhrases, StatusCodes } = require("http-status-codes")

const addUser = async (req, res, next) => {//add a user

    const {username, email, password} = req.body;

    let existingUser;

    try{
        existingUser = await User.findOne({email: email});
    }catch(err){
        return next(new HttpError(err, 500))
    }

    if(existingUser){
        return next(new HttpError("Email already exists", 422))
    }

    try{
        existingUser = await User.findOne({username: username});
    }catch(err){
        return next(new HttpError(err, 500))
    }

    if(existingUser){
        return next(new HttpError("Username already exists", 422))
    }

    if(password.length < 8){
        return next(new HttpError("Password has to be at least 8 characters long", 422))
    }

    const addedUser = new User({
        name: req.body.name, 
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        website: req.body.website,
        address: {
            street: req.body.address.street,
            suite: req.body.address.suite,
            city: req.body.address.city,
            zipcode: req.body.address.zipcode,
            geo: {
                lat: req.body.address.geo.lat,
                lng: req.body.address.geo.lng,
            },
        },
        company: {
            name: req.body.company.name,
            catchPhrase: req.body.company.catchPhrase,
            bs: req.body.company.bs,
        },
    });

    try{
        await addedUser.save();
    }catch(err){
        return next(new HttpError("Signing up failed, please try again", 500))
    }

    res.status(StatusCodes.CREATED).json({
        message: ReasonPhrases.CREATED,
        data: addedUser.toObject({getters: true})
    })

}

const login = async (req, res, next) => {//login

    const {email, password} = req.body;
    let existingUser;

    try{
        existingUser = await User.findOne({email: email});
    }catch(err){
        return next(new HttpError("Login Failed", 500))
    }

    if (!existingUser){
        try{
            existingUser = await User.findOne({username: email});
        }catch(err){
            return next(new HttpError("Login Failed", 500))
        }
    }

    if (!existingUser || existingUser.password !== password){
        return next(new HttpError("Invalid credentials", 401))
    }

    res.json(existingUser);

    // const result = await User.find({ $or: [{username: req.body.email}, {email: req.body.email}], 'address.zipcode': req.body.password }).exec();
    // res.json(result);
}

const getUsers = async (req, res, next) => { //find all users or user by id

    const idParam = req.query.id;

    if(idParam){
        let user;

        try{
            user = await User.findById(idParam).exec();
        }catch(err){
            return next(new HttpError("Not found", 400))
        }

        if(user){
            res.status(StatusCodes.OK).json({
                message: ReasonPhrases.OK,
                data: user.toObject({getters: true}),
            });
        }else{
            res.status(StatusCodes.NOT_FOUND).json({
                message: ReasonPhrases.NOT_FOUND
            });
        }
    }else{
        let users;
        try{
            users = await User.find().exec();
        }catch(err){
            return next(new HttpError(err, 404))
        }
        res.status(StatusCodes.OK).json({
            message: ReasonPhrases.OK,
            data: users,
        });
    }

}

const getUser = async (req, res, next) => { //find a user by id

    const idParam = req.params.id;
    let user;

    try{
        user = await User.findById(idParam).exec();
    }catch(err){
        return next(new HttpError("Not found", 400))
    }

    if(user){
        res.status(StatusCodes.OK).json({
            message: ReasonPhrases.OK,
            data: user.toObject({getters: true}),
        });
    }else{
        res.status(StatusCodes.NOT_FOUND).json({
            message: ReasonPhrases.NOT_FOUND
        });
    }
}

const updateUser = async (req, res, next) => { //update a user by id

    const idParam = req.params.id;
    await updateAUser(req,res,next,idParam);
    
}

const updateUser2 = async (req, res, next) => { //update a user by id

    const idParam = req.query.id;
    await updateAUser(req,res,next,idParam);

}

const updateAUser = async (req, res, next, idParam) => {

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

    try{
        duplicate = await User.find({_id: { $ne: idParam}, username: req.body.username}).exec();
    }catch(err){
        return next(new HttpError(err, 500))
    }

    if(duplicate[0]){
        return next(new HttpError("Username already exists", 422))
    }
    
    if (oldUser){

        const user = await User.findByIdAndUpdate(
            idParam,
            { 
                name: req.body.name, 
                username: req.body.username,
                email: req.body.email,
                password: oldUser.password, //Dont change the "password" here
                phone: req.body.phone,
                website: req.body.website,
                address: {
                    street: req.body.address.street,
                    suite: req.body.address.suite,
                    city: req.body.address.city,
                    zipcode: req.body.address.zipcode, 
                    geo: {
                        lat: req.body.address.geo.lat,
                        lng: req.body.address.geo.lng,
                    },
                },
                company: {
                    name: req.body.company.name,
                    catchPhrase: req.body.company.catchPhrase,
                    bs: req.body.company.bs,
                },
            },
            {
              new: true,
            }
          ).exec();

        res.status(StatusCodes.OK).json({
            message: ReasonPhrases.OK,
            data: user.toObject({getters: true}),
        });
    }else{
        res.status(StatusCodes.NOT_FOUND).json({
            message: ReasonPhrases.NOT_FOUND
        });
    }

}

const updatePassword = async (req, res, next) => { //update a user password by id

    const idParam = req.params.id;
    await updateAUserPassword(req,res,next,idParam);
    
}

const updatePassword2 = async (req, res, next) => { //update a user password by id

    const idParam = req.query.id;
    await updateAUserPassword(req,res,next,idParam);
    
}

const updateAUserPassword = async (req, res, next, idParam) => {

    let oldUser;
    try{
        oldUser = await User.findById(idParam).exec();
    }catch(err){
        return next(new HttpError(err, 400))
    }

    if(req.body.password.length < 8){
        return next(new HttpError("Password has to be at least 8 characters long", 422))
    }
    
    if (oldUser){

        const user = await User.findByIdAndUpdate(
            idParam,
            { password: req.body.password, },
            {
              new: true,
            }
          ).exec();

        res.status(StatusCodes.OK).json({
            message: ReasonPhrases.OK,
            data: user.toObject({getters: true}),
        });
    }else{
        res.status(StatusCodes.NOT_FOUND).json({
            message: ReasonPhrases.NOT_FOUND
        });
    }

}

const deleteUser = async (req, res, next) => { //delete a user by id

    const idParam = req.params.id;

    let user;
    try{
        user = await User.findById(idParam).exec();
    }catch(err){
        return next(new HttpError("Not found", 400))
    }

    if (user){
        await user.remove();
        res.status(StatusCodes.OK).json({
            message: ReasonPhrases.OK,
            data: "User Deleted!",
        });
    }else{
        res.status(StatusCodes.NOT_FOUND).json({
            message: ReasonPhrases.NOT_FOUND
        });
    }
}

const deleteUsers = async (req, res, next) => { //delete all users or user by id

    let idParam = req.query.id;

    if(idParam){
        let user;
        try{
            user = await User.findById(idParam).exec();
        }catch(err){
            return next(new HttpError("Not found", 400))
        }

        if (user){
            await user.remove();
            res.status(StatusCodes.OK).json({
                message: ReasonPhrases.OK,
                data: "User Deleted!",
            });
        }else{
            res.status(StatusCodes.NOT_FOUND).json({
                message: ReasonPhrases.NOT_FOUND
            });
        }
    }else{
        let result;
        try{
            result = await User.deleteMany({}).exec();
        }catch(err){
            return next(new HttpError("Not found", 400))
        }
        res.json(result);
    }

}

exports.addUser = addUser;
exports.getUsers = getUsers;
exports.login = login;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.updateUser2 = updateUser2;
exports.updatePassword = updatePassword;
exports.updatePassword2 = updatePassword2;
exports.deleteUser = deleteUser;
exports.deleteUsers = deleteUsers;