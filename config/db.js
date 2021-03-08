const mongoose = require('mongoose');
require('dotenv').config({ path: 'enviroment.env' });

// Conexión a mongo
const connectionDB = async () => {
    try {
       await mongoose.connect( process.env.DB_MONGO, {
           useNewUrlParser      : true,
           useUnifiedTopology   : true,
           useFindAndModify     : false
       });
       console.log("BD connect");
    } catch (error) {
        console.log(error);
        console.log("No esta conectada a la BD");
        process.exit(1); //se detiene la app
    }
}

module.exports = connectionDB;