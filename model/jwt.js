const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email:{
        type:String,
        trim: true,
        lowercase: true,
        unique: true
    },
    firstName:{
        type:String,
        trim: true
    },
    lastName:{
        type:String,
        trim: true
    },
    phoneNumber:{
        type:String,
        trim: true,
        default:''
    },
    displayPicture:{
        type:String,
        trim: true,
        default:''
    }
});

const jwtSchema = mongoose.Schema({
    _id:String,
    user:userSchema
});

module.exports = mongoose.model('JWT',jwtSchema);