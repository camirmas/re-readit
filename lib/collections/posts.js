Posts = new Mongo.Collection('posts');

Meteor.methods({
  saveToBoard: function(post) {
    check(post.boardId, String);
    check(post.content, Object);

    Posts.insert(post);
  }
});
