const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;
const UserSchema = new mongoose.Schema({

    appointments: [{
        type: ObjectId,
        ref: 'Appointment'
        }],
    FullName: {
        type: String
    },
    Email: {
        type: String
    },
    Phone: {
        type: String
    },
    Password: {
        type: String
    },
    Age: {
        type: String
    },
    Image: {
        type: String
    },
    HomeAddress: {
        type: String
    },
    Maladies:{
        type:String

    },
    Prix:{
        type:String
    }, 
    Speciality:{
        type:String
    },
    TypeUser:{
        type: Number
    },
    AccountState: {
        type: Boolean,
        default: true
    }

}, { timestamps: true });
module.exports = mongoose.model("User", UserSchema); 