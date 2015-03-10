Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

PostsListController = RouteController.extend({
  template: 'postsList',
  link: function() {
    if (this.params.sub) {
      return "https://www.reddit.com/r/" + this.params.sub + "/.json";
    }
    return "https://www.reddit.com/.json";
  },
  posts: function() {
    return RedditPosts.find();
  },
  data: function() {
    RedditPosts.remove();
    Meteor.call('getPosts', this.link(), function(error, result) {
      _.each(result, function(post) {
        RedditPosts.insert(post);
      });
    });
  }
});

Router.route('/', {
  name: 'postsList'
});

Router.route('/r/:sub', {
  name: 'subPostsList',
  controller: PostsListController
});
