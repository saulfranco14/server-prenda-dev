const User                  = require('../models/User');
const bcryptjs              = require('bcryptjs');
const jwt                   = require('jsonwebtoken');
const { validationResult }  = require('express-validator');

exports.createUser = async ( req, response ) => {

    const errors                = validationResult(req);
    if( !errors.isEmpty() ){
        return response.status( 400 ).json( { errors: errors.array() } )
    }

    const { email, password }   = req.body;

    try {
        let user = await User.findOne({email});
        
        if(user){
            return response.status(400).json({ msg: 'Hay un error al crear tu usuario, intente más tarde.'});
        }

        // creación del nuevo usuario
        user = new User(req.body);
        
        /*
            Hasher el password
            salt : aunque sean igual password se hashearan de diferente forma
        */
        const salt          = await bcryptjs.genSalt(10);
        user.password      = await bcryptjs.hash( password, salt );

        // guardar usuario
        await user.save();

        // JWT
        const payload ={
            user : {
                id : user.id,
            }
        };

        jwt.sign( payload, process.env.SECRET,{
            expiresIn : 3600
        }, ( error, token ) => {
            if( error ) throw error;
            response.json( { token } );
        });

        // Exitoso
        // response.json({ msg: 'Se ha creado tu usuario.'});
    } catch (error) {
        console.log(error);
        response.status(400).send("hubo un error al crear un usuario");
    }
}