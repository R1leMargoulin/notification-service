const mongoose= require('mongoose');

const notifs = mongoose.model(
    "notifs",
    new mongoose.Schema({
        id_user:{
            type:Number,
            required:true
        },
        message:{
            type:String,
            required:true
        },
        date:{
            type: Date,
            required: true
        },
        route:{
            type:String
        }
    })
);

module.exports = notifs;