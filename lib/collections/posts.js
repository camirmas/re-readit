Posts = new Mongo.Collection('posts');

Meteor.methods({
  saveToBoard: function(post) {
    check(post.boardId, String);
    check(post, Object);

    Posts.insert(post);
  }
});
