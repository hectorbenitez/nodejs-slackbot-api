const jwt = require('jsonwebtoken');

const generateJWT = ( id = '' ) => {

    return new Promise((resolve, reject) => {
        const payload = { id };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '12h'
        }, ( err, token ) => {
            if( err ){
                console.log(err);
                reject('token could not be created');
            } else {
                resolve( token );
            }
        })
    })
}

module.exports = {
    generateJWT
};
