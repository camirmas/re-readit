Template.userFollowing.helpers({
  following: function() {
    var followingIds = Following.findOne({userId: this._id}).users;
    return Meteor.users.find({_id: {$in: followingIds}});
  }
});
