Template.newsfeed.helpers({
  notifications: function() {
    var userId = Meteor.user()._id;
    return Notifications.find({followers: userId});
  }
})
