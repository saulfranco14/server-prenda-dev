const express           = require('express');
const router            = express.Router();
const userController    = require('../controllers/userController');
const { check }         = require('express-validator');

/*
    JSON para creación del usuario
    method : POST
    http://localhost:4000/api/users
    {
        "nombre"    : "Saúl Mauricio Franco Rentería",
        "email"     : "saul.franco1420@gmail.com",
        "password"  : "mateo142'"
    }

*/
router.post('/', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Ingresa un email válido').isEmail(),
        check('password', 'El password debe de tener minimo 8 caracteres').isLength({ min: 8}),
    ],
    userController.createUser
);

module.exports = router;