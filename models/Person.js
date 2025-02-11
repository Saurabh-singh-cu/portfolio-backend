 
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        required : true,
        type : String,
        trim : true
    },
    age : {
        required : true,
        type : Number
    },
    work : {
        required : true, 
        enum : ['manager', 'waiter', 'cheif'],
        type : String
    },
    mobile : {
        required : true,
        type : String,
        unique : true
    },
    email : {
        required : true,
        unique : true,
        type : String
    }
})
const Person = mongoose.model('Person', userSchema);
module.exports = Person;