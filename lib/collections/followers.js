Followers = new Mongo.Collection("followers");

Meteor.methods({
  'createFollowers': function(id) {
    Followers.insert({
      userId: id,
      users: []
    });
  },
  'addFollower': function(current, user) {
    Followers.update(current, {
      $addToSet: { users: user }
    });
  }
});
