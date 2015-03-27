Template.layout.events({
  'click .public-profile': function() {
    Router.go('userPublic', {_id: Meteor.user()._id});
  }
});
