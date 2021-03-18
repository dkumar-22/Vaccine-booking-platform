require("dotenv").config();
const router = require("express").Router();
let Registered = require("../models/registered.model");
const nodemailer = require("nodemailer");
var credentials = require("./credentials.js");

let appointmentDetails;

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: credentials.email,
    pass: credentials.password,
  },
  secure: true,
});

router.route("/add").post((req, res) => {
  let datetoday = new Date();
  if (req.body.age > 59) {
    appointmentDetails =
      "Date and Time: " +
      req.body.appointmentDateandTime.replace("T", " ") +
      "<br/><p>*Timings in 24H format</p>";
  } else {
    appointmentDetails =
      "<b>Date: </b>" +
      req.body.appointmentDate +
      "<br/><b>Slot: </b>" +
      req.body.slot.start +
      "-" +
      req.body.slot.end +
      "<br/><p>*Timings in 24H format</p>";
  }
  const registered = new Registered({
    fname: req.body.fname,
    lname: req.body.lname,
    address: req.body.address,
    city: req.body.city,
    state: req.body.zip,
    zip: req.body.zip,
    phone: req.body.phone,
    email: req.body.email,
    shospital: req.body.shospital,
    dob: req.body.dob,
    slot: req.body.slot,
    appointmentDateandTime: req.body.appointmentDateandTime,
    appointmentDate: req.body.appointmentDate,
    age: req.body.age,
    date: datetoday.toString(),
  });
  registered
    .save()
    .then((rec) => {
      const mailData = {
        from: credentials.email,
        to: req.body.email,
        subject: "Vaccine Confimation",
        text: "text",
        html:
          "<br>Vaccine Booked! </br><br>Thank You for registering for the Vaccination Program.<br>Your Booking ID: " +
          "<b>" +
          rec._id +
          "</b>" +
          "<br/>Keep this mail for future reference.<br><br>Stay safe and healthy!<br/><br/><b>Booking Details:</b><br/>" +
          appointmentDetails,
      };

      transporter.sendMail(mailData, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log("Mail Sent");
      });
      res.send(rec._id);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;