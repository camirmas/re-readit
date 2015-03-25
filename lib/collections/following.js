Following = new Mongo.Collection("following");

Meteor.methods({
  'createFollowing': function(id) {
    Following.insert({
      userId: id,
      users: [],
      boards: []
    });
  },
  'followUser': function(current, toFollow) {
    Following.update(current, {
      $addToSet: { users: toFollow }
    });
  }
});
