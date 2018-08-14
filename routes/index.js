const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const envConfig = require('dotenv').config();
const User = require('../models/User');
const Workout = require('../models/Workout');

// Mongoose
mongoose.connect(process.env.DB_CONNECTION);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to database');
});

/* GET the home page */
router.get('/', (req, res, next) => {
    res.sendFile('index.html', { root:  'public' });
});

/* Create a new user */
router.post('/api/user/add/:username', (req, res, next) => {
    if (req && req.params && !req.params.username) {
        return res.status(400).json({ error: 'Username is missing' });
    }

    User.findOne({ Username: req.params.username }, (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Error searching for existing user' });
        } else if (user) {
            return res.status(401).json({ error: 'Username already exists' });
        }
        
        const newUser = new User({
            Username: req.params.username,
        });
        newUser.save((err, createdUser) => {
            if (err) {
                return res.status(500).json({ error: 'Error saving new user' });
            }
            return res.json({ user: createdUser });
        });
    });
});

/* Log a workout */
router.post('/api/exercise/add', (req, res, next) => {
    if (req && req.body && (!req.body.username || !req.body.description || !req.body.duration || !req.body.date)) {
        return res.status(400).json({ error: 'Required fields are missing' });
    }

    User.findOne({ Username: req.body.username }, (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Error searching for existing user' });
        } else if (!user) {
            return res.status(404).json({ error: 'User does not exist' });
        } else {
            const newWorkout = new Workout({
                Username: req.body.username,
                Description: req.body.description,
                Duration: req.body.duration,
                Date: req.body.date,
            });
            newWorkout.save((err, createdWorkout) => {
                if (err) {
                    return res.status(500).json({ error: 'Error saving new workout' });
                }
                return res.json({ workout: createdWorkout });
            });
        }
    });
});

/* Get a user's workout history */
router.get('/api/user/workouts/:username', (req, res, next) => {
    if (req && req.params && !req.params.username) {
        return res.status(400).json({ error: 'Username is missing' });
    }
    Workout.find({ Username: req.params.username }, null, { sort: { Date: -1 } }, (err, workouts) => {
        if (err) {
            return res.status(500).json({ error: 'Error getting workouts for this user' });
        }
        return res.json({ workouts });
    });
});

module.exports = router;
