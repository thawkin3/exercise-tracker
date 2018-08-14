const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
	Username: String,
	Description: String,
	Duration: Number,
	Date: String,
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
