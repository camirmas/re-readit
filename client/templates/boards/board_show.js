Template.boardShow.helpers({
  posts: function() {
    return Posts.find({boardId: this._id});
  }
});
