$(document).ready(function() {
	$('#createUserForm').on('submit', function(e) {
		e.preventDefault();
		var username = $('#createUserForm #username').val();
		return $.post('/api/user/add/' + username)
			.done(function(response) {
				$('#createUser .resultValue').text('User created: ' + response.user.Username);
				$('#createUserForm #username').val('');
			})
			.fail(function(xhr) {
				console.log(xhr);
				$('#createUser .resultValue').text(xhr.responseJSON.error);
			});
	});

	$('#logWorkoutForm').on('submit', function(e) {
		e.preventDefault();
		var jsonData = {
			username: $('#logWorkoutForm #username').val(),
			description: $('#logWorkoutForm #description').val(),
			duration: $('#logWorkoutForm #duration').val(),
			date: $('#logWorkoutForm #date').val(),
		};
		return $.post('/api/exercise/add', jsonData)
			.done(function(response) {
				$('#logWorkout .resultValue').text('Workout logged: ' + JSON.stringify(response.workout.Username));
				$('#logWorkoutForm #username, #logWorkoutForm #description, #logWorkoutForm #duration, #logWorkoutForm #date').val('');
			})
			.fail(function(xhr) {
				console.log(xhr);
				$('#logWorkout .resultValue').text(xhr.responseJSON.error);
			});

	// TODO: get workout history form
	});
});
