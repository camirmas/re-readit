Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

PostsListController = RouteController.extend({
  link: function() {
    if (this.params.sub) {
      return "https://www.reddit.com/r/" + this.params.sub + "/.json";
    }
    return "https://www.reddit.com/.json";
  },
  posts: function() {
    return Session.get('redditPosts');
  },
  data: function() {
    Meteor.call('getPosts', this.link(), function(error, result) {
      Session.set('redditPosts', result)
    });
    return {posts: this.posts()};
  }
});

Router.route('/', {
  name: 'postsList'
});

SubPostsListController = PostsListController.extend({
  template: 'subPostsList'
});

Router.route('/r/:sub', {
  name: 'subPostsList'
});
