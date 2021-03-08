const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    created_at : {
        type    : Date,
        default : Date.now(),
    },
    name : {
        type        : String,
        trim        : true,
        required    : true
    },
    estado : {
        type        : Boolean,
        default     : false
    },
    project_id : {
        type    : mongoose.Schema.Types.ObjectId,
        ref     : 'Project',
    },
    active : {
        type        : Boolean,
        default     : true
    }

});

module.exports= mongoose.model('Task',TaskSchema);