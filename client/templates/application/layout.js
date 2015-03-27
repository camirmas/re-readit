Template.layout.helpers({
  unreadNotifications: function() {
    var user = Meteor.user()._id;
    return Notifications.find({followers: user, read: false}).count();
  },
})

Template.layout.events({
  'click .unreadNotif': function() {
    var user = Meteor.user()._id;
    var notifications = Notifications.find({followers: user, read: false});
    notifications.forEach(function(notification) {
      Notifications.update(notification._id, {$set: {read: true}})
    });
  },
  'click .public-profile': function() {
    Router.go('userPublic', {_id: Meteor.user()._id});
  }
})
