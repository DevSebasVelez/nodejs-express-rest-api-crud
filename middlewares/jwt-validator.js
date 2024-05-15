const { response, request } = require('express');
const jwt = require('jsonwebtoken');


const jwtValidate = ( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if( !token ){
        return res.status(400).json({
            ok: false,
            msg: 'No se recibió ningún token'
        })
    }

    try {

        const payload = jwt.verify( token, process.env.SECRET_JWT_SEED );

        req.uid = payload.uid;
        req.name = payload.name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token invalido'
        })
    }

    next();

}


module.exports = {
    jwtValidate,
}