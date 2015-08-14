Meteor.subscribe("roles");
Meteor.subscribe("team_members");

Template.roles.helpers({
  
  roles: function() 
  {
    return Roles.find({parent:""});
  }

});

Template.role.helpers({

  pathView: function() {
    var role = this;
    var params = {
        roleId: role._id
    };
    var routeName = "rolePost";
    var path = FlowRouter.path(routeName, params);

    return path;
  },

  pathEdit: function() {
    var role = this;
    var params = {
        roleId: role._id
    };
    var routeName = "rolePostEdit";
    var path = FlowRouter.path(routeName, params);

    return path;
  },

  roles: function() 
  {
    return Roles.find({parent: this._id});
  }

});


Template.role.events({

  'mouseenter a.droppable': function (event) 
  {
      event.stopPropagation();
      $(event.currentTarget).addClass('widen');
  },
  'mouseleave a.droppable': function (event) 
  {
      event.stopPropagation();
      $(event.currentTarget).removeClass('widen');
  }


});

Template.role.rendered = function() {

  $('.droppable').droppable({
    accept: '.draggable',
    over: function( event, ui ) {

        $(this).addClass('over');

    },
    out: function( event, ui ) {

        $(this).removeClass('over');

    },
    drop: function( event, ui ) { 

        var parentId = $(this).data("id");
        ui.helper.data('parent', parentId);

        //Roles.update(childId, { $set:{parent:parentId} } );
        
        $(this).removeClass('over');

    }

  });

  $('.draggable').draggable({

      revert: false,
      cursor:"move",
      zIndex: 100,
      start: function(event, ui) 
      {

        var thisItem = $(this);

        var child = thisItem.children('a');
        var childId = child.data("id");

        ui.helper.data('child', childId);
        ui.helper.data('parent', false);

      },
      stop: function(event, ui)
      {

          var update = false;

          var thisItem = $(this);

          var childId = ui.helper.data('child');
          var parentId = ui.helper.data('parent');

          if(childId && parentId)
          {

            var roleData = Roles.findOne(childId);

            if(roleData && roleData.parent &&  roleData.parent != parentId )
            {
                update = true;
            } 

          } 

          if(update)
          {

            Roles.update(childId, { $set:{parent:parentId} } );

          } else {

            thisItem.attr('style', '');

          }

      }

  });

  
}

/*
Template.blogHome.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('roles');  
  });
});
*/

/*
Template.blogPost.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var roleId = FlowRouter.getParam('roleId');
    self.subscribe('singlePost', roleId);  
  });
});
*/

Template.blogPost.helpers({
  role: function() {
    var roleId = FlowRouter.getParam('roleId');
    var role = Roles.findOne({_id : roleId});
    return role;
  }
});

Template.blogPostEdit.helpers({
  role: function() {
    var roleId = FlowRouter.getParam('roleId');
    var role = Roles.findOne({_id : roleId});
    return role;
  },
  roles: function() {
    return Roles.find();
  },
  team: function() 
  {
    return Team.find({});
  }

});


Template.blogPostAdd.events({
 
 	"submit": function (event, template) 
 	{
    	// Prevent default browser form submit
    	event.preventDefault();

	 	form={};
	    
	    $.each( $(event.target).serializeArray(), function() {
	        form[this.name] = this.value;
	    });

      	Roles.insert(form);

	  	FlowRouter.go('/');
    
    }
    
});


Template.blogPostEdit.events({
 
 	"submit": function (event, template) 
 	{
    	// Prevent default browser form submit
    	event.preventDefault();
 		
 		var roleId = FlowRouter.getParam('roleId');
	 	
	 	   form={};
	    
	       $.each( $(event.target).serializeArray(), function() {
	        form[this.name] = this.value;
	       });


        var assigned=[];
        $('.assigned:checked').each(function(){
            assigned.push( $(this).val() );
        });

        form['assigned'] = assigned;

      	Roles.update(roleId, {$set:form} );

	  	  //FlowRouter.go('/' + roleId);

        FlowRouter.go('/');
    
    }

});


/*
Template.body.helpers({

	roles: function () {
    	return Roles.find({});
    }

});


Template.body.events({

    "submit .new-role": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var title = event.target.title.value;
 
      // Insert a task into the collection

      Roles.insert({
        title: title,
      });

      // Clear form
      event.target.title.value = "";

    }

  });


  Template.role.events({

    "click .text": function (event) 
    {
      alert('yes');

    },

    "click .delete": function (event) 
    {
    	event.preventDefault();
      	Roles.remove(this._id);
    }

  });
  */