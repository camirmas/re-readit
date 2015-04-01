Template.userFollowers.helpers({
  followers: function() {
    var followerIds = Followers.findOne({userId: this._id}).users;
    return Meteor.users.find({_id: {$in: followerIds}});
  }
});
