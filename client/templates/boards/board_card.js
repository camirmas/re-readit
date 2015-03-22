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
    var _this = this;
    if (confirm("Are you sure you want to delete this?")) {
      Posts.find({boardId: this._id}).forEach(function(post) {
        Meteor.call('postDelete', post);
      });
      Meteor.call('boardDelete', _this);
    }
  }
});
