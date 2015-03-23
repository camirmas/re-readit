Posts = new Mongo.Collection('posts');

Meteor.methods({
  saveToBoard: function(post) {
    check(post.boardId, String);
    check(post, Object);

    var user = Meteor.user();
    var board = Boards.findOne(post.boardId);
    if (ownsDocument(user._id, board)) {
      Posts.insert(post);
    } else {
      throw new Meteor.Error('invalid-save', "You cannot save to this board");
    }
  },
  postDelete: function(post) {
    check(post._id, String);

    var user = Meteor.user();
    var board = Boards.findOne(post.boardId);

    if (ownsDocument(user._id, board)) {
      Posts.remove(post._id);
    } else {
      throw new Meteor.Error('invalid-delete', "You cannot delete this post");
    }
  }
});
