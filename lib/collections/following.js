Following = new Mongo.Collection("following");

Meteor.methods({
  createFollowing: function(id) {
    Following.insert({
      userId: id,
      users: [],
      boards: []
    });
  },
  followingAddBoard: function(boardId) {
    check(boardId, String);
    var user = Meteor.user();
    Following.update(
      {userId: user._id},
      {$addToSet: {boards: boardId}}
    );
  },
  followingRemoveBoard: function(boardId) {
    check(boardId, String);
    var user = Meteor.user();
    Following.update(
      {userId: user._id},
      {$pull: {boards: boardId}}
    );
  },
  followUser: function(current, toFollow) {
    Following.update(current, {
      $addToSet: { users: toFollow }
    });
    followNotification(toFollow);
  }
})
