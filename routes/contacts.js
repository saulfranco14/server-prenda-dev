const express           = require('express');
const router            = express.Router();
const auth              = require('../middleware/auth');
const contactController = require('../controllers/contactController');
const { check }         = require('express-validator');

/* Crea proyectos contactos */
router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email',  'El email del usuario es obligatorio').not().isEmpty(),
        check('sexo',   'El sexo del usuario es obligatorio').not().isEmpty(),
        check('role',   'El role del usuario es obligatorio').not().isEmpty(),
    ],
    auth,
    contactController.createContact
)

// Obtiene los contactos 
router.get('/',
    auth,
    contactController.getContacts
)

// Actualizar los contactos
router.put('/:id',
    auth,
    contactController.putContacts
)



module.exports = router;