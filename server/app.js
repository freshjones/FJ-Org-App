Meteor.publish('roles', function() {
	return Roles.find({});
});

Meteor.publish('team_members', function() {
	return Team.find({});
});

Meteor.publish('singlePost', function(id) {
	check(id, String);
	// Make a delay manually to show the loading state
	Meteor._sleepForMs(1000);
	return Roles.find({_id: id});
});