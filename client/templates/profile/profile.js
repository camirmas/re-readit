Template.profile.helpers({
  followers: function() {
    return Followers.findOne({userId: Meteor.user()._id}).users;
  },
  following: function() {
    return Following.findOne({userId: Meteor.user()._id}).users;
  }
});

Template.profile.events({
  'click .log-out': function() {
    Meteor.logout();
  }
});
