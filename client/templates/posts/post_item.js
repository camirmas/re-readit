Template.postItem.helpers({
  postURL: function() {
    return '/r/' + this.data.subreddit + '/' + this.data.title;
  }
});
