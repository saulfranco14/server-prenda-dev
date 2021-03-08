const express           = require('express');
const router            = express.Router();
const { check }         = require('express-validator');
const auth              = require('../middleware/auth');
const authController    = require('../controllers/authController');

// api/auth
router.post('/', 
    // [
    //     check('email', 'Ingresa un email válido').isEmail(),
    //     check('password', 'El password debe de tener minimo 8 caracteres').isLength({ min: 8}),
    // ],
    authController.authUser
);

router.get('/',
    auth,
    authController.getUserAuth
);
module.exports = router;