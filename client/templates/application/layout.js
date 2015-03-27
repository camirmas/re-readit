Template.layout.helpers({
  currentUrl: function() {
    return 'users/' + Meteor.user()._id;
  }
});
