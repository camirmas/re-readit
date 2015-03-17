Template.postItem.helpers({
  postURL: function() {
    return '/r/' + this.data.subreddit + '/post/' + this.data.id;
  },
  thumbnail: function() {
    return this.data.thumbnail || "http://placehold.it/140x100&text=hello+:)";
  }
});

Template.postItem.events({
  'click .post': function(e, template) {
    Session.set('currentPost', template.data);
  }
})
