Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

PostsListController = RouteController.extend({
  // nextPath: function() {
  //   return Router.routes.postsList.path({page: this.nextPage + 1});
  // },
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

Router.route('/r/:sub/', {
  name: 'subPostsList'
});

Router.route('/r/:sub/:title', {
  name: 'postShow',
  data: function() {
    var posts = Session.get('redditPosts');
    posts = _.map(posts, function(post) {
      return post.data;
    });
    var post = _.findWhere(posts, {
      title: this.params.title
    });
    return post;
  }
});
