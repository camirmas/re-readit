Template.postShow.helpers({
  postSaved: function() {
    var post = Posts.findOne();
    if (post) {
      return Boards.findOne(post.boardId).userId === Meteor.user()._id;
    }
    return false;
  }
});
