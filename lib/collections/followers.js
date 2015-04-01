Followers = new Mongo.Collection("followers");

Meteor.methods({
  'createFollowers': function(id) {
    Followers.insert({
      userId: id,
      users: [],
      boards: []
    });
  },
  'addFollower': function(current, user) {
    Followers.update(current, {
      $addToSet: { users: user }
    });
  },
  'removeFollower':function(current, user) {
    Followers.update(current, {
      $pull: { users: user }
    });
  },
  'addBoardFollower': function(current, user) {
    Followers.update(current, {
      $addToSet: { boards: user }
    });
  },
  'removeBoardFollower': function(current, user) {
    Followers.update(current, {
      $pull: { boards: user }
    });
  }
});
