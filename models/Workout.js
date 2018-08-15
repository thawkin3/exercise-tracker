const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
	Username: String,
	Description: String,
	Duration: Number,
	Date: Date,
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
