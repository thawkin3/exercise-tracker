$(document).ready(function() {
	$('#createUserForm').on('submit', function(e) {
		e.preventDefault();
		var username = $('#createUserForm #username1').val();
		return $.post('/api/user/add/' + username)
			.done(function(response) {
				$('#createUser .resultValue').text('User created: ' + response.user.Username);
				$('#createUserForm #username1').val('');
			})
			.fail(function(xhr) {
				$('#createUser .resultValue').text(xhr.responseJSON.error);
			});
	});

	$('#logWorkoutForm').on('submit', function(e) {
		e.preventDefault();
		var jsonData = {
			username: $('#logWorkoutForm #username2').val(),
			description: $('#logWorkoutForm #description').val(),
			duration: $('#logWorkoutForm #duration').val(),
			date: new Date($('#logWorkoutForm #date').val()),
		};
		return $.post('/api/exercise/add', jsonData)
			.done(function(response) {
				$('#logWorkout .resultValue').text('Workout logged: ' + JSON.stringify(response.workout));
				$('#logWorkoutForm #username2, #logWorkoutForm #description, #logWorkoutForm #duration, #logWorkoutForm #date').val('');
			})
			.fail(function(xhr) {
				$('#logWorkout .resultValue').text(xhr.responseJSON.error);
			});
	});

	$('#getWorkoutHistoryForm').on('submit', function(e) {
		e.preventDefault();
		var username = $('#getWorkoutHistoryForm #username3').val();
		return $.post('/api/user/workouts/' + username)
			.done(function(response) {
				$('#getWorkoutHistory .resultValue').text('Workout history for ' + username + ': ' + JSON.stringify(response.workouts));
				$('#getWorkoutHistoryForm #username3').val('');
			})
			.fail(function(xhr) {
				$('#getWorkoutHistory .resultValue').text(xhr.responseJSON.error);
			});
	});
});
