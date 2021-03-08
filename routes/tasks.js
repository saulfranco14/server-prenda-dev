const express           = require('express');
const router            = express.Router();
const auth              = require('../middleware/auth');
const taskController    = require('../controllers/taskController');
const { check }         = require('express-validator');

/* Crea proyectos api/task */
router.post('/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('project_id', 'El proyecto es obligatorio').not().isEmpty(),
    ],
    auth,
    taskController.createTask
)

// Obtiene las tareas 
router.get('/',
    auth,
    taskController.getTasks
)

// Actualizar las tareas
router.put('/:id',
    auth,
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
    ],
    taskController.putTasks
)

// Desactivar o activar los proyectos
router.put('/desactive/:id',
    auth,
    taskController.desactiveTask
)


module.exports = router;