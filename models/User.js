const mongoose = require('mongoose');

// const opts = { toJSON: { virtuals: true } };

const UserSchema = mongoose.Schema({
    created_at :{
        type: Date,
        default : Date.now(),
    },
    updated_at : {
        type: Date,
        required : false,
    },
    nombre :{
        type : String,
        required: true,
        trim: true,
    },
    email:{
        type : String,
        required : true,
        trim: true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
        trim: true,
    },
    role : {
        type: String,
        required : true,
        trim: true,
    },
    sexo : {
        type : String,
        required : true,
        trim: true,
    },
    last_login : {
        type: Date,
        require : false,
    },
    active : {
        type: Boolean,
        default : true,
    },
    id : {
        type: String,
        require: false
    } 
});

module.exports = mongoose.model('User', UserSchema );