Template.userEdit.events({
  'click .log-out-button': function() {
    Meteor.logout(function() {
      Router.go('/');
    });
  }
});
