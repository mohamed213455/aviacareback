const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;
const AppointmentSchema = new mongoose.Schema({

iduser1: {
  type: String
},
iduser2: {
  type: String
},
date: {
    type: String
},
hour: {
  type: String
},
price: {
  type: String
}

   
    
  });


module.exports = mongoose.model("Appointment", AppointmentSchema); 