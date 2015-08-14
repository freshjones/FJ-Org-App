FlowRouter.route('/', {
	name: 'roleHome',
  action: function() {
    BlazeLayout.render("mainLayout", {content: "blogHome"});  }
});

FlowRouter.route('/:roleId', {
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

FlowRouter.route('/:roleId/edit', {
  name: 'rolePostEdit',
  action: function() {
    BlazeLayout.render("mainLayout", {content: "blogPostEdit"});
  }
});