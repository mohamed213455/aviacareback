const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const verifytoken = require('../verifytoken');
const Client = require('../Models/User');
const nodemailer = require('nodemailer');
const Appointment = require('../Models/Appointment');

exports.Register = async function (req, res) {
    try {
        //checking if email already in use
        const emailExist = await Client.findOne({
            Email: req.body.Email,
        });
        if (emailExist) return res.status(400).send('email already in usee');

        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.Password, salt);

        //creating user
        const client = new Client({
            FullName: req.body.FullName,
            Email: req.body.Email,
            Phone: req.body.Phone,
            Password: hashedPassword,
            Age: req.body.Age,
            Image: req.body.Image,
            Maladies:req.body.State,
            prix:req.body.prix,
            speciality:req.body.speciality,
            TypeUser:req.body.TypeUser,
            HomeAddress: req.body.HomeAddress,
            
        });

        const savedclient = await client.save();
        const Act = await SendingCode(client.Email);
        res.status(200).json({
            client: savedclient,
            act: Act,
            status: true,
            message: 'You successfully created an account',
        });
        console.log(Act);
        console.log(savedclient);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

    
};
 
exports.Login = async function (req, res) {
    try {
        //checking username
        const ClientExist = await Client.findOne({
            Email: req.body.Email,
        });
        if (!ClientExist)
            return res.status(404).json({
                message: 'Client not found',
                status: false,
            });

        //checking password
        const passwordValidbcrypt = await bcrypt.compare(
            req.body.Password,
            ClientExist.Password
        );
        if (!passwordValidbcrypt)
            return res.status(400).json({
                message: 'Wrong Password',
                status: false,
            });

        if (ClientExist.AccountState == false) {
            return res.status(401).send('Verify Account');
        }

        
        
        res.status(200).json({
            message: 'you are logged in',
            Client: ClientExist,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const SendingCode = async function (email) {

    const ActivationNumber = Math.floor(100000 + Math.random() * 999999);
    var smtpTransport = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        secureConnection: false, // TSL requires secureConnection to be false
        port: 587, // port for secure SMTP

        auth: {
            user: 'aviacare23@outlook.com',
            pass: 'Mohamedkalech123',
        },
    });

    // setup e-mail data, even with unicode symbols
    var mailOptions = {
        from: '"Avia Care"' + 'aviacare23@outlook.com', // sender address (who sends)
        to: email, // list of receivers (who receives)
        subject: 'Verification Number', // Subject line
        text: 'Verify your Account', // plaintext body
        html: 'Confirmation Code: ' + ActivationNumber, // html body
    };

    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }

        console.log('Message sent: ' + info.response);
    });
    
    return ActivationNumber;
};
exports.ResendCode = async function (req, res) {
    try {
        const emailExist = await Client.findOne({
            Email: req.body.Email,
        });
        if (!emailExist) return res.status(400).send('client not found');
        const ActivationNumber = Math.floor(100000 + Math.random() * 999999);
        var smtpTransport = nodemailer.createTransport({
            host: 'smtp-mail.outlook.com',
            secureConnection: false, // TLS requires secureConnection to be false
            port: 587, // port for secure SMTP

            auth: {
                user: 'aviacare23@outlook.com',
                pass: 'Mohamedkalech123',
            },
        });
        // setup e-mail data, even with unicode symbols
        var mailOptions = {
            from: '"Avia Care"' + 'aviacare23@outlook.com',  // sender address (who sends)
            to: req.body.Email, // list of receivers (who receives)
            subject: 'Verification Number', // Subject line
            text: 'Verify your Account', // plaintext body
            html: 'Confirmation Code: ' + ActivationNumber, // html body
        };
        // send mail with defined transport object
        smtpTransport.sendMail(mailOptions, function (error, info) {
            if (error) {
                return res.status(404).json({ error: error.message });
            }

            res.status(200).json({ message: 'code sent : ', act: ActivationNumber });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




exports.VerifyAccount = async function (req, res) {
    try {
        const verificationCode = req.params.ActivationNumber;
        const Act = req.body.Act
    const email = req.params.Email;

    console.log(Act);
  
    Client.findOne({ Email: email }, (error, client) => {
      if (error) {
        return res.send({ success: false, message: 'An error occurred while verifying the code.' });
      }
  
      if (!client) {
        return res.send({ success: false, message: 'Client not found.' });
      }
  
      if (verificationCode === Act) {
        // Update the client's account state to true
        client.AccountState = true;
        client.save((error) => {
          if (error) {
            return res.send({ success: false, message: 'An error occurred while updating the account state.' });
          }
  
          return res.send({ success: true, message: 'Verification successful.' });
        });
      } else {
        res.send({ success: false, message: 'Invalid verification code.' });
        console.log(verificationCode);
        console.log(Act);
      }
    });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


   

exports.findOne = async (req, res, next) => {
    try {
        const id = req.params.id;
        const client = await Client.findById(id)
        if (!client) {
            res.status(404).json('Airport not found');
        } else {
            res.status(200).json(client);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.find = (req, res) => {

    Client.find()
        .then(client => {
            res.send(client)
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error Occurred while retriving clients information" })
        })
}



exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty" })
    }

    const id = req.params.id;
    Client.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Update client with ${id}. Maybe client not found!` })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error Update client information" })
        })
}



exports.delete = (req, res) => {
    const id = req.params.id;

    Client.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` })
            } else {
                res.send({
                    message: "Client was deleted successfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Client with id=" + id
            });
        });
}
