FlowRouter.route('/', {
	name: 'roleHome',
  action: function() {
    BlazeLayout.render("mainLayout", {content: "blogHome"});  }
});

FlowRouter.route('/role/:roleId', {
  name: 'rolePost',
  action: function() {
    BlazeLayout.render("mainLayout", {content: "blogPost"});
  }
});

FlowRouter.route('/role/add', {
  name: 'rolePostAdd',
  action: function() {
    BlazeLayout.render("mainLayout", {content: "blogPostAdd"});
  }
});

FlowRouter.route('/role/:roleId/edit', {
  name: 'rolePostEdit',
  action: function() {
    BlazeLayout.render("mainLayout", {content: "blogPostEdit"});
  }
});

FlowRouter.route('/standards', {
  name: 'standardsList',
  action: function() {
    BlazeLayout.render("mainLayout", {content: "standardsList"});
  }
});

FlowRouter.route('/standards/add', {
  name: 'standardsAdd',
  action: function() {
    BlazeLayout.render("mainLayout", {content: "standardsList", sidebar: "standardsAdd"});
  }
});

FlowRouter.route('/departments', {
  name: 'departmentList',
  action: function() {
    BlazeLayout.render("mainLayout", {content: "departmentList"});
  }
});

FlowRouter.route('/departments/add', {
  name: 'departmentAdd',
  action: function() {
    BlazeLayout.render("mainLayout", {content: "departmentList", sidebar: "departmentAdd"});
  }
});

FlowRouter.route('/departments/:id/edit', {
  name: 'departmentEdit',
  action: function() {
    BlazeLayout.render("mainLayout", {content: "departmentList", sidebar: "departmentEdit"});
  }
});