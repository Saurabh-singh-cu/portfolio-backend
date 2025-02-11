const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name : {
        required : true,
        type : String,
        trim : true
    },
    price : {
        required : true,
        type : Number,

    },
    category : {
        required : true, 
        enum : ['veg', 'non-veg'],
        type : String
    },
    description : {
        required : true,
        type : String
    },

})

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports = MenuItem;
