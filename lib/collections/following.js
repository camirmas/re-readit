Following = new Mongo.Collection("following");

Meteor.methods({
  insertFollowing: function() {
    var user = Meteor.user();
    Following.insert({
      userId: user._id,
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
  }
})

/*
id
userId
users: [userId1, ..., userIdn]
boards: [boardId1, ..., boardIdn]
*/
