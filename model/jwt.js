const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email:String,
    firstName:String,
    lastName:String,
    phoneNumber:String,
    displayPicture:String
});

const jwtSchema = mongoose.Schema({
    _id:String,
    user:userSchema,
    expirationTime:Date
});

module.exports = mongoose.model('JWT',jwtSchema);