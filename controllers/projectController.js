const Project               = require('../models/Project');
const { validationResult }  = require('express-validator');
const { request } = require('express');

exports.createProject = async ( request, response ) => {

    // Se revisa si hay errores de validacion
    const errors                = validationResult(request);
    if( !errors.isEmpty() ){
        return response.status( 400 ).json( { errors: errors.array() } )
    }

    const { name, description, speciality, active } = request.body;

    try {
        
        const project   = new Project(request.body);
        project.user_id = request.user.id;
        await project.save();
        response.json(project);

    } catch (error) {
        console.log(error);
        response.status(400).send('Hubo un error al crear el proyecto');
    }
}

// GET PROJECT
exports.getProjects = async( request, response )=>{
    try {
        const projects = await Project.find({ user_id : request.user.id });
        response.json( { projects } );
    } catch (error) {
        console.log(error);
        response.status(500).send('Hubo un error al traer los proyectos');
    }
}

// PUT PROJECT

exports.putProjects = async( request, response ) => {

    const { name, description, speciality, active }      = request.body;
    const newProject    = {
        // 'active': true
    };
    
    if( name )          newProject.name           = name; 
    if( description )   newProject.description    = description; 
    if( speciality )    newProject.speciality     = speciality; 
    if( active )        newProject.active         = active; 

    try {
        // Review in ID
        let project = await Project.findById( request.params.id) ;

        // Review the project if it exists or not
        if(!project){
            return response.status(404).json( { msg : 'Proyecto no encontrado'} );
        }

        // Verify user_id in the project
        if(project.user_id.toString() !== request.user.id ){
            return response.status(401).json( { msg: 'Hubo un problema.(auth)'} );
        }

        // Update
        project = await Project.findByIdAndUpdate(
                                                    { _id: request.params.id }, 
                                                    { $set: newProject },
                                                    { new: true },  
                                                    );
        
        response.json( { project } );

    } catch (error) {
        console.log(error);
        response.json(500).send('Hay un error al actualizarlo.');
        
    }
}

exports.desactiveProject = async( request, response ) => {
    
    try {
        // Review in ID
        let project = await Project.findById( request.params.id) ;
        
        // Updated active the project
        const { active }      = project;
        let activeProject;
        active === true ? activeProject = false :  activeProject = true;
        const newProject    = {
            'active': activeProject
        };


        // Review the project if it exists or not
        if(!project){
            return response.status(404).json( { msg : 'Proyecto no encontrado'} );
        }

        // Verify user_id in the project
        if(project.user_id.toString() !== request.user.id ){
            return response.status(401).json( { msg: 'Hubo un problema.(auth)'} );
        }

        // Update
        project = await Project.findByIdAndUpdate(
                                                    { _id: request.params.id }, 
                                                    { $set: newProject },
                                                    { new: true },  
                                                    );
        
        // Update text the response
        let updateText ;
        project.active === true ? updateText = 'activo'  : updateText = 'desactivo';
        response.json( { msg : `Se puso como ${updateText}  el proyecto`, task: project } );

    } catch (error) {
        console.log(error);
        response.json(500).send('Hay un error al actualizarlo.(active)');
        
    }
}