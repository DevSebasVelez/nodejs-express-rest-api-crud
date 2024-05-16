const express = require('express');
const bcrypt  = require('bcryptjs');
const  User = require('../models/user-model');
const { generateJWT } = require('../helpers/jwt');

const createUser = async(req, res = express.response) => {

    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email });

        if( user ) {
            return res.status(400).json({
                ok: false,
                msg: 'Este usuario ya esta registrado'
            })
        }

        user = new User( req.body );

        //Encrypt Password
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync( password, salt );

        //Save user in DB
        await user.save();

        // Generate JWT
        const token = await generateJWT( user.id, user.name );


        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token: token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error interno, comuníquese con un administrador'
        })
    }

}


const loginUser = async(req, res = express.response) => {

    const { email, password } = req.body;


    try {

        const user = await User.findOne({ email });

        if( !user ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe'
            })
        }

        //Validate Passwords
        const validPassword = bcrypt.compareSync( password, user.password );

        if( !validPassword ) {
            return res.status(500).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            })
        }

        // Generate JWT
        const token = await generateJWT( user.id, user.name );


        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token: token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error de autenticación',
        })
    }

}




const revalidateToken = async(req, res) => {

    const uid = req.uid;
    const name = req.name;

    const token = await generateJWT( uid, name );

    res.json({
        uid,
        name,
        ok: true,
        token: token
    })
}




module.exports = {
    createUser,
    loginUser,
    revalidateToken,
}