const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
    const token = req.header('x-token');
    if( !token ){
        return res.status(401).json({
            msg: "There is no token in the request"
        })
    }
    try {
        jwt.verify( token, process.env.SECRETORPRIVATEKEY);
        next();
    }catch(error){
        console.log(error);
        res.status(401).json({
            msg: "Invalid Token"
        })
    }
    console.log(token);
}

module.exports = {
    validateJWT
};
