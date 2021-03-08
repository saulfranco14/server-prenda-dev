const Task                  = require('../models/Task');
const Project               = require('../models/Project');
const { validationResult }  = require('express-validator');
const { request, response } = require('express');

exports.createTask = async( request, response ) =>{

    // Se revisa si hay errores de validacion
    const errors                = validationResult(request);
    if( !errors.isEmpty() ){
        return response.status( 400 ).json( { errors: errors.array() } )
    }

    const { project_id } = request.body;

    //Review the project 
    try {
        
        const project = await Project.findById(project_id);
        
        // Review the project if it exists or not
        if(!project){
            return response.status(404).json( { msg: ' Proyecto no encontrado'} );
        }

         // Verify user_id in the project
         if(project.user_id.toString() !== request.user.id ){
            return response.status(401).json( { msg: 'Hubo un problema.(auth-task)'} );
        }

        const task = new Task(request.body);
        await task.save();
        response.json({ tasks : task, msg: "Tarea creada exitosamente" })
        
    } catch (error) {
        console.log(error);
        response.json( { msg : "Hay un error en el proyecto"} );
    } 

}

// GET PROJECT
exports.getTasks = async( request, response )=>{

    const { project_id } = request.query;

    try {

        const project = await Project.findById(project_id);
        
        // Review the project if it exists or not
        if(!project){
            return response.status(404).json( { msg: ' Proyecto no encontrado'} );
        }

        // Verify user_id in the project
        if(project.user_id.toString() !== request.user.id ){
            return response.status(401).json( { msg: 'Hubo un problema.(auth-task)'} );
        }

        // Get Tasks
        const tasks = await Task.find({ project_id });
        response.json({ msg: "task get", projectId : tasks[0].project_id, tasks: tasks });
        
    } catch (error) {
        console.log(error);
        response.json( { msg : "Hay un error en las tareas"} );
    }
}

exports.putTasks = async( request, response ) => {
    
    const { project_id, name, estado } = request.body;
    try {

        //Review the tasks
        let findTask = await Task.findById( request.params.id);
        if( !findTask ){
            return response.status(404).json( { msg: 'Tareas no encontrada'} );

        }
        // Review the project
        const project = await Project.findById(project_id);
        // Verify user_id in the project
        if(project.user_id.toString() !== request.user.id ){
            return response.status(401).json( { msg: 'Hubo un problema.(auth-task)'} );
        }

        const newTask = { };
        newTask.name    = name; 
        newTask.estado  = estado; 

        findTask = await Task.findOneAndUpdate( { _id: request.params.id}, newTask, { new : true } );
        response.json( { msg: "Tarea Actualizada", task: findTask } );
        
    } catch (error) {
        console.log(error);
        response.status(500).json( { msg: " hubo un error al actualizar la tarea "} );
    }
}

exports.desactiveTask = async( request, response ) => {

    try {
        let project_id = request.body.params.project_id;
        //Review the tasks
        let findTask = await Task.findById( request.body.params.taskId );
        if( !findTask ){
            return response.status(404).json( { msg: 'Tareas no encontrada'} );

        }
        // Review the project
        const project = await Project.findById(project_id);
        // Verify user_id in the project
        if(project.user_id.toString() !== request.user.id ){
            return response.status(401).json( { msg: 'Hubo un problema.(auth-task)'} );
        }
        // Updated active : false the task
        const newTask    = {
            'active': false
        };
      
        findTask = await Task.findOneAndUpdate( { _id: request.params.id}, newTask, { new : true } );
        response.json( { msg: "Tarea Actualizada", task: findTask } );

    } catch (error) {
        console.log(error)
    }

}