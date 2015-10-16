Template.standardsList.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('standards');  
  });
});

Template.standardsList.helpers({
  standards: function() 
  {
    return Standards.find({});
  }
});

Template.standardsList.events({

	"click #btn-add-std": function (event) 
  	{
      event.preventDefault();
      event.stopPropagation();

      FlowRouter.go('standardsAdd');

    },

    "click .btn-delete-std": function (event)
    {	
    	event.preventDefault();
    	Standards.remove(this._id);
    },

    "click .btn-edit-std": function (event)
    {	
    	event.preventDefault();
    	FlowRouter.go('standardsEdit');
    }

});


Template.standardsAdd.events({

	"submit #add-standard": function (event) 
  	{
    	
    	event.preventDefault();
    	
    	var std = event.target.standard.value;

    	Standards.insert({ standard: std });
		
		event.target.standard.value = '';
      	//FlowRouter.go('standardsList');

    }

});