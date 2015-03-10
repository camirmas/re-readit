Template.postsList.helpers({
  posts: function() {
    return RedditPosts.find();
  }
});
