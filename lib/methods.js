Roles = new Mongo.Collection('roles');
Team = new Mongo.Collection("team");
Standards = new Mongo.Collection("standards");
Departments = new Mongo.Collection("departments");

Roles.helpers({
  team: function() {
  	if(this.assigned != undefined)
  	{
  		return Team.find({ _id: { $in : this.assigned }  });
  	} else {
  		return {};
  	}
    
  },
  parentObj: function() {
    if(this.parent == "")
    {
      var par = {};
      par.title = 'TOP';
      return par;
    } else {
      return Roles.findOne(this.parent);
    }
  },
  childrenObj: function() {

    children = Roles.find({parent: this._id});

    if(children.length <= 0)
    {
      return {};
    } else {
      return children;
    }
  }
});

Team.helpers({
  name: function() {
  	return this.fname + " " + this.lname;
  }
});

