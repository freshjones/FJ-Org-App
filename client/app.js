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

  'mouseenter .droppable': function (event) 
  {
      event.stopPropagation();
      $(event.currentTarget).addClass('widen');
  },
  'mouseleave .droppable': function (event) 
  {
      event.stopPropagation();
      $(event.currentTarget).removeClass('widen');
  },
  'click .delete': function (event) 
  {
      event.preventDefault();
      event.stopPropagation();
      
      var thisParent = this.parent;
      var thisID = this._id;

      var children = Roles.find({parent:thisID}).fetch();

      if(children.length > 0 )
      {
        $.each( children, function() 
        {
          Roles.update(this._id, { $set:{parent:thisParent} } );
        });
      }

      Roles.update(this._id, { $set:{parent:'unset'} } );

  },
  'click .node': function (event) 
  {
      event.preventDefault();
      event.stopPropagation();

      FlowRouter.go('/role/' + this._id);
      
  },




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

        var child = thisItem.children('div');
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
    
  },

  'click #add-responsibility': function (event) 
  {

    event.preventDefault();

    var roleId = FlowRouter.getParam('roleId');
    var role = Roles.findOne({_id : roleId});
    var responsibility = $('.new-responsibility').val();

    update={};
    update.responsibility = [];

    if(typeof role.responsibility == 'object' && role.responsibility.length > 0)
    {
      update.responsibility.push.apply(update.responsibility, role.responsibility);
    }

    if(responsibility.length)
    {
      update.responsibility.push(responsibility);
    }

    if(update.responsibility.length > 0)
    {
      Roles.update(roleId, {$set:update} ); 
    }

    $('.new-responsibility').val('');

      
  },

  'click #add-qualification': function (event) 
  {
      event.preventDefault(); 
  },

  'click .delete-responsibility': function (event) 
  {
      event.preventDefault(); 

      var roleId = FlowRouter.getParam('roleId');

      var li = $(event.target).parent();

      li.remove();

      update={};
      update.responsibility = [];

      $('#responsibilities li').each(function(i)
      {
        var item = $(this).find('.item').text();
        update.responsibility.push(item);
      });

      if(update.responsibility.length > 0)
      {
        Roles.update(roleId, {$set:update} ); 
      }

  }


});