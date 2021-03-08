const express           = require('express');
const router            = express.Router();
const auth              = require('../middleware/auth');
const projectController = require('../controllers/projectController');
const { check }         = require('express-validator');

/* Crea proyectos api/projects */
router.post('/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('speciality', 'El tipo de de proyecto es obligatorio').not().isEmpty(),
    ],
    auth,
    projectController.createProject
)

// Obtiene los proyectos 
router.get('/',
    auth,
    projectController.getProjects
)

// Actualizar los proyectos
router.put('/:id',
    auth,
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('speciality', 'El tipo de de proyecto es obligatorio').not().isEmpty(),
        check('active', 'Debe de estar activo el desactivo el proyecto').not().isEmpty(),
    ],
    projectController.putProjects
)

// Desactivar o activar los proyectos
router.put('/active/:id',
    auth,
    projectController.desactiveProject
)


module.exports = router;