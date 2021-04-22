const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const users = require("./users.js");
const destinations = require("./destinations.js");
const cities = require("./cities.js");

//
// Tickets
//

const User = users.model;
const Destination = destinations.model;
const City = cities.model;
const validUser = users.valid;
const validAdmin = users.admin;

// This is the schema for a review
const reviewSchema = new mongoose.Schema({
  destination: {
    type: mongoose.Schema.ObjectId,
    ref: "Destination"
  },
  content: String,
  rating: Number,
  created: {
    type: Date,
    default: Date.now
  },
});

// The model for a review
const Review = mongoose.model('Review', reviewSchema);

router.post('/', validUser, async (req, res) => {
    try {
        let destination = await Destination.findOne({_id: req.params.destinationID});
        if (!destination) {
          return res.status(403).send({
            message: "destination not found"
          });
        }
        let review = new Review({
            destination: destination,
            content: req.body.content,
        });
        await review.save();
        res.send(review);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Get a list of reviews for a specific destination
router.get('/', async (req, res) => {
    try {
        let destination = await Destination.findOne({_id: req.params.destinationID});
        if (!destination) {
          return res.status(403).send({
            message: "destination not found"
          });
        }
        let reviews = await Review.find({destination: destination});
        res.send(reviews);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Update a review
router.put('/:reviewID', validUser, validAdmin, async (req, res) => {
    try {
        let review = await Review.findOne({_id:req.params.reviewID, destination: req.params.destinationID, city: req.params.cityID});
        if (!review) {
          return res.status(403).send({
            message: "Review not found"
          });
        }
        review.destination = req.body.destination;
        review.content = req.body.content;
        review.rating = req.body.rating;
        await review.save();
        res.send(review);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Delete a review
router.delete('/:reviewID', validUser, validAdmin, async (req, res) => {
    try {
        let review = await Review.findOne({_id:req.params.reviewID, destination: req.params.destinationID, city: req.params.cityID});
        if (!review) {
          return res.status(403).send({
            message: "review not found"
          });
        }
        await review.delete();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

module.exports = {
  routes: router,
  model: Review
};
