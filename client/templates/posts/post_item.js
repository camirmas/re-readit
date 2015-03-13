Template.postItem.helpers({
  postURL: function() {
    return '/r/' + this.data.subreddit + '/post/' + this.data.id;
  }
});
