Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return [
      Meteor.subscribe('followers'),
      Meteor.subscribe('notifications')
    ]
  },
});

Router.route('/youtube/:ids?', {
  name: 'youtubePlaylist',
  data:
    function() {
      return this.params.ids;
    }
});

Router.route('/login');

Router.route('/newsfeed', {
  name: 'newsfeed',
  waitOn: function() {
    return Meteor.subscribe('notifications');
  }
});

Router.route('/users/:_id', {
  name: 'userPublic',
  waitOn: function() {
    return [
      Meteor.subscribe('users'),
      Meteor.subscribe('posts'),
      Meteor.subscribe('userBoards', this.params._id),
      Meteor.subscribe('followers'),
      Meteor.subscribe('following')
    ];
  },
  data: function() {
    return Meteor.users.findOne(this.params._id);
  }
});

Router.route('/users/:_id/edit', {
  name: 'userEdit'
});

Router.route('/users/:_id/followers', {
  name: 'userFollowers',
  waitOn: function() {
    return [
      Meteor.subscribe('users'),
      Meteor.subscribe('followers'),
      Meteor.subscribe('following')
    ];
  },
  data: function() {
    return Meteor.users.findOne(this.params._id);
  }
});

Router.route('/users/:_id/following', {
  name: 'userFollowing',
  waitOn: function() {
    return [
      Meteor.subscribe('users'),
      Meteor.subscribe('following'),
      Meteor.subscribe('followers')
    ];
  },
  data: function() {
    return Meteor.users.findOne(this.params._id);
  }
});

Router.route('/boards', {
  name: 'boardsList',
  waitOn: function() {
    return [
      Meteor.subscribe('boards'),
      Meteor.subscribe('posts'),
      Meteor.subscribe('following'),
      Meteor.subscribe('followers')
    ];
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
      Session.set('currentSub', this.params.sub);
      return "https://www.reddit.com/r/" + this.params.sub + "/.json";
    }
    return "https://www.reddit.com/.json";
  },
  posts: function() {
    var posts;
    var _this = this;

    if (this.params.page) {
      Session.set('page', this.params.page);
    } else {
      RedditPosts.remove({}, function() {
        Meteor.call('getPosts', _this.link(), function(error, result) {
          _.each(result, function(item) {
            if(RedditPosts.find().count() !== 25) {
              RedditPosts.insert({
                title: item.data.title,
                author: item.data.author,
                subreddit: item.data.subreddit,
                url: item.data.url,
                redditId: item.data.id,
                score: item.data.score,
                domain: item.data.domain,
                thumbnail: item.data.thumbnail,
                permalink: item.data.permalink
              });
            }
          });
        });
      });
    }

    return RedditPosts.find();
  },
  data: function() {
    if (RedditPosts.find().count() === 0) {
      return {
        sub: this.params.sub,
        posts: this.posts()
      };
    } else {
      return {
        sub: this.params.sub,
        posts: RedditPosts.find()
      }
    }
  }
});

Router.route('/:page?', {
  name: 'postsList'
});

SubPostsListController = PostsListController.extend({
  template: 'postsList'
});

PostShowController = RouteController.extend({
  subscriptions: function() {
    Meteor.subscribe('boards');
    Meteor.subscribe('singlePost', this.params.post_id);
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
        RedditPosts.update(post, {$set: {imgurGallery: res}});
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
    else if (post.domain.indexOf("vimeo") !== -1) {
      RedditPosts.update(post, {$set: {vimeo: url}});
    }
    else if (post.domain.indexOf("imgur") !== -1) {
      this.getImgur(post);
    }
    else {
      Meteor.call('getText', post.permalink, function(err, res) {
        RedditPosts.update(post, {$set: {redditText: res}});
      });
    }
  },
  getPost: function() {
    var link = "http://www.reddit.com/r/"
    + this.params.sub
    + "/comments/"
    + this.params.post_id
    + "/.json";

    var _this = this;
    Meteor.call('getPost', link, function(err, res) {
      if (err) {
        console.log(err);
      } else {
        id = RedditPosts.insert(res);
        _this.getMedia(RedditPosts.findOne(id));
      }
    });
  },
  data: function() {
    var post;
    var dbPost = Posts.findOne({redditId: this.params.post_id});
    var clientPost = RedditPosts.findOne({redditId: this.params.post_id});

    if (dbPost) {
      post = dbPost;
    } else if (clientPost) {
      post = clientPost;
      this.getMedia(post);
    }

    if (!post) {
      this.getPost();
      return {
        post: RedditPosts.findOne(),
        boards: this.boards()
      }
    } else {
      return {
        post: post,
        boards: this.boards()
      }
    }
  }
});

Router.route('/r/:sub/post/:post_id', {
  name: 'postShow',
  waitOn: function() {
    return [
       Meteor.subscribe('boards'),
       Meteor.subscribe('following')
    ]
  }
});

Router.route('/r/:sub/:page?', {
  name: 'subPostsList'
});

var deletePages = function() {
  delete Session.keys['page', 'currentSub'];
  this.next();
}

Router.onBeforeAction(deletePages, {only: 'postsList'});
