const jwt = require('jsonwebtoken');

const generarJWT = (uid, firstName, lastName, email, birthDate, gender) => {
    
    return new Promise( (resolve, reject) => {

        const payload = {uid, firstName, lastName, email, birthDate, gender};

        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '24h'
        }, (error, token) => {
            if (error){
                console.log(error);
                reject("Couldn't generate token");
            }
            resolve(token);
        })

    });

}

module.exports = {
    generarJWT
}