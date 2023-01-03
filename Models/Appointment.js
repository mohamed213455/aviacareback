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
},
patientfullname : {
  type: String

},
caregiverfullname : {
  type: String

},
homeAddress : {
  type: String

},
ImagePatient : {
  type: String

},
ImageCaregiver: {
  type: String

},
status : {
  type : String
}


   
    
  });


module.exports = mongoose.model("Appointment", AppointmentSchema); 