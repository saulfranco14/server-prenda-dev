const Contact               = require('../models/User');
const { validationResult }  = require('express-validator');
const bcryptjs              = require('bcryptjs');

// Creación del usuario/contacto
exports.createContact = async ( request, response ) => {

    const errors                = validationResult(request);
    if( !errors.isEmpty() ) return response.status( 400 ).json( { errors: errors.array() } )
    const { password }   = request.body;

    try {
        const contact   = new Contact(request.body);
        /*
        Hasher el password
        salt : aunque sean igual password se hashearan de diferente forma
        */
        const salt              = await bcryptjs.genSalt(10);
        contact.password        = await bcryptjs.hash( password, salt );
    
        await contact.save();
       
        response.json({ statusCode: 1,  contact: contact, msg: "Contacto creada exitosamente" })
    } catch (error) {
        console.log(error);
        response.status(400).send('Hubo un error al crear al usuario');
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


// GET CONTACTS
exports.getContacts = async( request, response )=>{
    try {
        const contacts = await Contact.find({});
        response.json({contacts});
    } catch (error) {
        console.log(error);
        response.status(500).send('Hubo un error al traer los contacts');
    }
}
