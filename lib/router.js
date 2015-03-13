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
    var posts;
    var _this = this;
    if (this.params.page) {
      Meteor.call('getNextPage', function(error, result) {
        _.each(result, function(item) {
          RedditPosts.insert(item);
        });
      });
    } else {
      RedditPosts.remove({}, function() {
        Meteor.call('getPosts', _this.link(), function(error, result) {
          _.each(result, function(item) {
            RedditPosts.insert(item);
          });
        });
      });
    }
    return RedditPosts.find();
  },
  data: function() {
    return {
      sub: this.params.sub,
      posts: this.posts()
    };
  }
});

Router.route('/:page?', {
  name: 'postsList'
});

SubPostsListController = PostsListController.extend({
  template: 'subPostsList'
});

Router.route('/r/:sub/post/:post_id', {
  name: 'postShow',
  data: function() {
    var _this = this;
    var post;
    RedditPosts.find().forEach(function(item) {
      if (item.data.id === _this.params.post_id) {
        post = item;
      }
    });
    return post.data;
  }
});

Router.route('/r/:sub/:page?', {
  name: 'subPostsList'
});
