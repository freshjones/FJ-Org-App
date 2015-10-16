Template.departmentList.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('departments');  
  });
});

Template.departmentList.helpers({
  departments: function() 
  {
    return Departments.find({});
  }
});

Template.departmentList.events({

  "click #btn-add-dept": function (event) 
  {
    event.preventDefault();
    event.stopPropagation();

    FlowRouter.go('departmentAdd');

  },

  "click .btn-delete-dept": function (event)
  { 
    event.preventDefault();
    Departments.remove(this._id);
  },

  "click .btn-edit-dept": function (event)
  { 
    event.preventDefault();
    FlowRouter.go('departmentEdit', {'id':this._id});
  }

});


Template.departmentEdit.helpers({

  department: function() 
  {
    var debtId = FlowRouter.getParam('id');
    var debt = Departments.findOne(debtId);

    if(debt && debt.department)
    {
      return debt.department;
    }
    
  }

});

Template.departmentEdit.events({

    "submit #edit-department": function (event) 
    {
      
      event.preventDefault();
      
      var debtId = FlowRouter.getParam('id');

      var dept = event.target.department.value;
    
      Departments.update(debtId, { $set:{'department':dept} } );

      FlowRouter.go('departmentList');

    }

});

Template.departmentAdd.events({

  "submit #add-department": function (event) 
    {
      
      event.preventDefault();
      
      var dept = event.target.department.value;

      Departments.insert({ department: dept });
    
      event.target.department.value = '';
        //FlowRouter.go('standardsList');

    }

});