Template.profile.events({
  'click .log-out': function() {
    Meteor.logout();
    // Router.go('profile');
  }
});
