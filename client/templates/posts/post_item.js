Template.postItem.helpers({
  postURL: function() {
    return '/r/' + this.subreddit + '/post/' + this.redditId;
  },
  thumbnail: function() {
    return this.thumbnail || "http://placehold.it/140x100&text=hello+:)";
  }
});

Template.postItem.events({
  'click .post': function(e, template) {
    Session.set('currentPost', template.data);
  }
})
