const {response} = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'There is no token in the request'
        })
    }

    try {

        const {uid, firstName, lastName, email, birthDate, gender} = jwt.verify(token, process.env.SECRET_JWT_SEED);

        req.uid = uid;
        req.firstName = firstName;
        req.lastName = lastName;
        req.email = email;
        req.birthDate = birthDate;
        req.gender = gender;
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Invalid token'
        })
    }

    next();
    
}

module.exports = {
    validarJWT
}