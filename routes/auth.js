/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const express = require('express');
const { check } = require('express-validator')
const router = express.Router();

const { createUser, loginUser, revalidateToken } = require('../controllers/auth');
const { fieldValidate } = require('../middlewares/field-validator');
const { jwtValidate } = require('../middlewares/jwt-validator');



router.post(
    '/new',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
        fieldValidate
    ],
    createUser);


router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña es incorrecta').not().isEmpty().isLength({ min: 6 }),
        fieldValidate
    ],
    loginUser);


router.get('/renew', jwtValidate, revalidateToken);





module.exports = router;