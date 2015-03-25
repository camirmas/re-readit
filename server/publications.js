Meteor.publish('boards', function() {
  return Boards.find();
});

Meteor.publish('singleBoard', function(id) {
  check(id, String);
  return Boards.find(id);
});

Meteor.publish('boardPosts', function(boardId) {
  check(boardId, String);
  return Posts.find({boardId: boardId});
});

Meteor.publish('singlePost', function(id) {
  check(id, String);
  return Posts.find({redditId: id});
});

Meteor.publish('posts', function() {
  return Posts.find();
});

Meteor.publish('singleUser', function(id) {
  return Meteor.users.find({_id: id});
});

Meteor.publish('userBoards', function(id) {
  return Boards.find({userId: id});
});

Meteor.publish('following', function() {
  return Following.find();
})
