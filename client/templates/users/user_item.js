Template.userItem.helpers({
  userUrl: function() {
    return '/users/' + this._id;
  },
  currentUser: function() {
    return Meteor.user()._id === this._id;
  },
  isFollowing: function() {
    var followerIds = Followers.findOne({userId: this._id}).users;
    return _.contains(followerIds, Meteor.user()._id);
  }
});

Template.userItem.events({
  'click .follow-user': function(e) {
    event.preventDefault();
    var following = Following.findOne({userId: Meteor.user()._id});
    var followers = Followers.findOne({userId: this._id});
    Meteor.call('followUser', following._id, this._id);
    Meteor.call('addFollower', followers._id, Meteor.user()._id);
  },
  'click .unfollow-user': function(e) {
    event.preventDefault();
    var following = Following.findOne({userId: Meteor.user()._id});
    var followers = Followers.findOne({userId: this._id});
    Meteor.call('unfollowUser', following._id, this._id);
    Meteor.call('removeFollower', followers._id, Meteor.user()._id);
  }
})
