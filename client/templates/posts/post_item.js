Template.postItem.helpers({
  postURL: function() {
    return '/r/' + this.subreddit + '/post/' + this.redditId;
  },
  thumbnail: function() {
    return this.thumbnail || "http://placehold.it/140x100&text=hello+:)";
  },
  onBoard: function() {
    return !!this.boardId;
  },
  canModify: function() {
    return Boards.findOne(this.boardId).userId === Meteor.user()._id;
  }
});

Template.postItem.events({
  'click .remove-post': function(e) {
    e.preventDefault();
    if (confirm("Are you sure you want to delete this?")) {
      Meteor.call('postDelete', this);
    }
  }
})
