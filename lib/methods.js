Roles = new Mongo.Collection('roles');
Team = new Mongo.Collection("team");

Roles.helpers({
  team: function() {
  	if(this.assigned != undefined)
  	{
  		return Team.find({ _id: { $in : this.assigned }  });
  	} else {
  		return {};
  	}
    
  }
});

Team.helpers({
  name: function() {
  	return this.fname + " " + this.lname;
  }
});

