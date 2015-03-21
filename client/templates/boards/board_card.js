Template.boardCard.helpers({
  coverImage: function() {
    var post = Posts.findOne({boardId: this._id});
    if (post) {
      return post.thumbnail;
    }
    return "http://placehold.it/600x400&text=hello+:)";
  }
});

Template.boardCard.events({
  'click .board-delete': function() {
    if (confirm("Are you sure you want to delete this?")) {
      console.log(this._id);
      console.log(Posts.find({boardId: this._id}));
    }
  }
});
