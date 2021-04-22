const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const users = require("./users.js");
const cities = require("./cities.js");

//
// Tickets
//

const User = users.model;
const City = cities.model;
const validUser = users.valid;
const validAdmin = users.admin;

// This is the schema for a destination
const destinationSchema = new mongoose.Schema({
  city: {
    type: mongoose.Schema.ObjectId,
    ref: "City"
  },
  type: String,
  rating: Number,
  created: {
    type: Date,
    default: Date.now
  },
});

// The model for a destination
const Destination = mongoose.model('Destination', destinationSchema);

router.post('/', validUser, validAdmin, async (req, res) => {
    if (!req.body.type)
      return res.status(400).send({
        message: "must provide a destination type"
    });
    try {
        let city = await City.findOne({_id: req.params.cityID});
        if (!city) {
          return res.status(403).send({
            message: "city not found"
          });
        }
        let destination = new Destination({
            city: city,
            type: req.body.type,
        });
        await destination.save();
        res.send(destination);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Get a list of destinations for a specific city
router.get('/', async (req, res) => {
    try {
        let city = await City.findOne({_id: req.params.cityID});
        if (!city) {
          return res.status(403).send({
            message: "city not found"
          });
        }
        let destinations = await Destination.find({city:city});
        res.send(destinations);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});


// Update a destination
router.put('/:destinationID', validUser, validAdmin, async (req, res) => {
    try {
        let destination = await Destination.findOne({_id:req.params.destinationID, city: req.params.cityID});
        if (!destination) {
          return res.status(403).send({
            message: "Destination not found"
          });
        }
        destination.city = req.body.city;
        destination.type = req.body.type;
        destination.rating = req.body.rating;
        await destination.save();
        res.send(destination);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Delete a destination
router.delete('/:destinationID', async (req, res) => {
    try {
        let destination = await Destination.findOne({_id:req.params.destinationID, city: req.params.cityID});
        if (!destination) {
          return res.status(403).send({
            message: "destination not found"
          });
        }
        await destination.delete();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

module.exports = {
  routes: router,
  model: Destination
};
