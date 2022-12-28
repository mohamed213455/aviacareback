const express = require('express');

const User = require('../Models/User');
const Appointment = require('../Models/Appointment');
const mongoose = require('mongoose');




exports.createAppointment = async(req, res) => {
  
  
  const id1 = req.body.iduser1;
  const id2 = req.body.iduser2;
  const appointment = new Appointment({
    iduser1: id1,
    iduser2: id2,
    date: req.body.date,
    hour: req.body.hour,
    price: req.body.price
  });

  console.log(appointment)
  appointment.save((err, appointment) => {
    if (err) {
      res.status(500).send(err);
    }

  });
  
  const user= await User.findByIdAndUpdate( id2,
    { $push: { appointments: appointment._id} },
    {
      strictPopulate: false,
      new: true,
      useFindAndModify: false,
    }
  ).populate({
    path: "appointments",
  });
  res.status(201).json({user});
};

exports.getAppointments = async(req, res) => {
  const iduser2 = req.query.iduser2;
  try {
    
   const appointments = await User.findById(iduser2).populate('appointments');
  // const appointments = await User.find("iduser2").populate('appointments');
   //const appointments = await Appointment.find({iduser2: iduser2}).populate({path:"iduser1"});
   //const appointments = await User.findById(iduser2).populate('appointments');
    
    res.json(appointments.appointments);
  } catch (err) {
    res.status(500).send(err);
  }
  
  console.log(iduser2);
  //const appointments = await Appointment.find({iduser2: iduser2}).populate({path:"iduser1"});
 // res.status(200).json(appointments);

    };

    exports.delete = (req, res) => {
      const id = req.params.id;
  
      Appointment.findByIdAndDelete(id)
          .then(data => {
              if (!data) {
                  res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` })
              } else {
                  res.send({
                      message: "appointment was deleted successfully!"
                  })
              }
          })
          .catch(err => {
              res.status(500).send({
                  message: "Could not delete appointment with id=" + id
              });
          });
  }