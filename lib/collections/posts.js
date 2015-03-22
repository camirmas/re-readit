Posts = new Mongo.Collection('posts');

Meteor.methods({
  saveToBoard: function(post) {
    check(post.boardId, String);
    check(post, Object);

    Posts.insert(post);
  },
  postDelete: function(post) {
    check(post._id, String);

    Posts.remove(post._id);
  }
});
