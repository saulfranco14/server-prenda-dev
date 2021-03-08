const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    created_at : {
        type    : Date,
        default : Date.now(),

    },
    updated_at :{
        type: Date,
    },
    name: {
        type        : String,
        required    : true,
        trim        : true,

    },
    description:{
        type    : String,
        trim    : true,
    },
    user_id: {
        type    : mongoose.Schema.Types.ObjectId,
        ref     : 'User',
    },
    speciality:{
        type        : String,
        required    : true,
        trim        : true,
    },
    active:{
        type        : Boolean,
        default     : true,
    }
});

module.exports = mongoose.model( 'Project', ProjectSchema );