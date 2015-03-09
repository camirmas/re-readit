Template.postsList.helpers({
  posts: function() {
    return RedditPosts.find();
  }
});

Template.postsList.rendered = function() {
  RedditPosts.remove();
  Meteor.call('getPosts', 'https://www.reddit.com/.json', function(error, result) {
    _.each(result, function(post) {
      RedditPosts.insert(post);
    });
  });
}
