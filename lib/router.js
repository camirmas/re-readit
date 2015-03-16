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

PostShowController = RouteController.extend({
  getId: function(url) {
    return url.match(/[\w]+/g).pop();
  },
  getImgur: function(post) {
    var url = post.data.url;
    var id = this.getId(url);
    var extensions = ["jpg", "png", "gif", "gifv"];

    if ((url.indexOf("/a/") !== -1) || (url.indexOf("/album/") !== -1)) {
      Meteor.call('getAlbum', id, function(err, res) {
        RedditPosts.update(post, {$set: {imgurGallery: res}});
      });
    } else if ((url.indexOf("/g/") !== -1) || (url.indexOf("/gallery/") !== -1)) {
      Meteor.call('getGallery', id, function(err, res) {
        RedditPosts.update(post, {$set: {imgurGallery: res}});
      });
    } else if (!_.contains(extensions, id)) {
      Meteor.call('getImage', id, function(err, res) {
        RedditPosts.update(post, {$set: {imgurImage: res.link}});
      });
    } else {
      RedditPosts.update(post, {$set: {imgurImage: url}});
    }
  },
  getMedia: function(post) {
    var url = post.data.url;
    var id = this.getId(url);

    if (post.data.domain.indexOf("youtu") !== -1) {
      RedditPosts.update(post, {$set: {youtube: id}});
    }
    if (post.data.domain.indexOf("vimeo") !== -1) {
      RedditPosts.update(post, {$set: {vimeo: url}});
    }
    if (post.data.domain.indexOf("imgur") !== -1) {
      this.getImgur(post);
    }
  },
  data: function() {
    var _this = this;
    var post;

    RedditPosts.find().forEach(function(item) {
      if (item.data.id === _this.params.post_id) {
        post = item;
      }
    });

    this.getMedia(post);
    return post;
  }
});

Router.route('/r/:sub/post/:post_id', {
  name: 'postShow'
});

Router.route('/r/:sub/:page?', {
  name: 'subPostsList'
});
