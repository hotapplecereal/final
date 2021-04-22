const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const users = require("./users.js");

//
// Tickets
//

const User = users.model;
const validUser = users.valid;
const validAdmin = users.admin;

// This is the schema for a city
const citySchema = new mongoose.Schema({
  name: String,
  country: String,
  created: {
    type: Date,
    default: Date.now
  },
});

// The model for a city
const City = mongoose.model('City', citySchema);

router.post('/', validUser, validAdmin, async (req, res) => {
    if (!req.body.name  || !req.body.country)
      return res.status(400).send({
        message: "must provide a name and a country"
    });
    try {
        let city = new City({
            name: req.body.name,
            country: req.body.country
        });
        await city.save();
        res.send(city);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Get a list of cities
router.get('/', async (req, res) => {
    try {
        let cities = await City.find();
        res.send(cities);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Search for a specific city
router.get('/search', async (req, res) => {
    try {
        let cities = [];
        if (req.body.country != "") {
          cities = await City.findMany({name: req.body.name, country: req.body.country});
        }
        else {
          cities = await City.findMany({name: req.body.name});
        }

        if (cities.length === 0) {
          return res.status(403).send({
            message: "No cities found"
          });
        }
        res.send(cities);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Update a city
router.put('/:cityID', validUser, validAdmin, async (req, res) => {
    try {
        let city = await City.findOne({_id:req.params.cityID});
        if (!city) {
          return res.status(403).send({
            message: "City not found"
          });
        }
        city.name = req.body.name;
        city.country = req.body.country;
        await city.save();
        res.send(city);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Delete a city
router.delete('/:cityID', validUser, validAdmin,  async (req, res) => {
    try {
        let city = await City.findOne({_id:req.params.cityID});
        if (!city) {
          return res.status(403).send({
            message: "City not found"
          });
        }
        await city.delete();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

module.exports = {
  routes: router,
  model: City,
};
