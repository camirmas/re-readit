Template.userPublic.helpers({
  boards: function() {
    return Boards.find();
  },
  user: function() {
    return Meteor.users.findOne();
  }
});

Template.userPublic.events({
  'click .follow-board': function(e) {
    if (Meteor.user()) {
      Meteor.call('followingAddBoard', this._id);
    }
  },
  'click .unfollow-board': function(e) {
    if (Meteor.user()) {
      Meteor.call('followingRemoveBoard', this._id);
    }
  }
});
