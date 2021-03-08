const User                  = require('../models/User');
const bcryptjs              = require('bcryptjs');
const jwt                   = require('jsonwebtoken');
const { validationResult }  = require('express-validator');

exports.authUser = async( request, response ) =>{
    
    const errors                = validationResult(request);
    if( !errors.isEmpty() ){
        return response.status( 400 ).json( { errors: errors.array() } )
    }

    const { email, password } = request.body;
    
    try {

        // Revisar usuario registrado
        let user = await User.findOne({email});
        if(!user){
            return response.status(400).json( { msg: ' Datos incorrectos ' } );
        }

        // Revisar password
        const passCorrect = await bcryptjs.compare( password, user.password );
        if(!passCorrect){
            return response.status(400).json( { msg: ' Datos incorrectos ' } );
        }

        // Guardamos el JWT
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

    } catch (error) {
        console.log(error);
    }
    
}

exports.getUserAuth = async ( request, response ) =>{
    try {
        const user = await User.findById( request.user.id ).select('-password');
        response.json( { msg: "user token", auth: user } );
    } catch (error) {
        console.log(error);
        response.status(500).json({ msg: 'Hubo un error en el auth de usuario.'});
    }
}