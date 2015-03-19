Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.route('/boards', {
  name: 'boardsList',
  waitOn: function() {
    return Meteor.subscribe('boards');
  },
});

Router.route('/boards/:_id', {
  name: 'boardShow',
  waitOn: function() {
    return [
      Meteor.subscribe('singleBoard', this.params._id),
      Meteor.subscribe('boardPosts', this.params._id)
    ];
  },
  data: function() {
    return Boards.findOne(this.params._id);
  }
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
          RedditPosts.insert({
            title: item.data.title,
            author: item.data.author,
            subreddit: item.data.subreddit,
            url: item.data.url,
            id: item.data.id,
            score: item.data.score,
            domain: item.data.domain,
            thumbnail: item.data.thumbnail
          });
        });
      });
    } else {
      RedditPosts.remove({}, function() {
        Meteor.call('getPosts', _this.link(), function(error, result) {
          _.each(result, function(item) {
            RedditPosts.insert({
              title: item.data.title,
              author: item.data.author,
              subreddit: item.data.subreddit,
              url: item.data.url,
              redditId: item.data.id,
              score: item.data.score,
              domain: item.data.domain,
              thumbnail: item.data.thumbnail
            });
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
  subscriptions: function() {
    Meteor.subscribe('boards');
    Meteor.subscribe('posts');
  },
  boards: function() {
    return Boards.find();
  },
  getId: function(url) {
    return url.match(/[\w-]+/g).pop();
  },
  getImgur: function(post) {
    var url = post.url;
    var id = this.getId(url);
    var extensions = ["jpg", "png", "gif"];

    if (_.contains(extensions, id)) {
      RedditPosts.update(post, {$set: {imgurImage: url}});
    } else if (id === "gifv") {
      RedditPosts.update(post, {$set: {imgurGifv: url}});
    } else if ((url.indexOf("/a/") !== -1) || (url.indexOf("/album/") !== -1)) {
      Meteor.call('getAlbum', id, function(err, res) {
        RedditPosts.update(post, {$set: {imgurAlbum: res}});
      });
    } else if ((url.indexOf("/g/") !== -1) || (url.indexOf("/gallery/") !== -1)) {
      Meteor.call('getGallery', id, function(err, res) {
        RedditPosts.update(post, {$set: {imgurGallery: res.link}});
      });
    } else {
      Meteor.call('getImage', id, function(err, res) {
        RedditPosts.update(post, {$set: {imgurImage: res.link}});
      });
    }
  },
  getMedia: function(post) {
    var url = post.url;
    var id = this.getId(url);

    if (post.domain.indexOf("youtu") !== -1) {
      RedditPosts.update(post, {$set: {youtube: id}});
    }
    if (post.domain.indexOf("vimeo") !== -1) {
      RedditPosts.update(post, {$set: {vimeo: url}});
    }
    if (post.domain.indexOf("imgur") !== -1) {
      this.getImgur(post);
    }
  },
  data: function() {
    var _this = this;
    var post = Session.get('currentPost') || Posts.findOne({redditId: this.params.post_id});
    if (!RedditPosts.findOne(post._id)) {
      RedditPosts.insert(post);
    }
    this.getMedia(post);
    var post = RedditPosts.findOne(post._id);
    console.log(post);
    return {
      post: post,
      boards: this.boards()
    }
  }
});

Router.route('/r/:sub/post/:post_id', {
  name: 'postShow'
});

Router.route('/r/:sub/:page?', {
  name: 'subPostsList'
});
