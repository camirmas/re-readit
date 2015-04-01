Template.postsList.helpers({
  firstPage: function() {
    return !Session.get('page');
  },
  postsLoaded: function() {
    return RedditPosts.find().count() !== 0;
  }
});

Template.postsList.events({
  'click .find-sub': function(e) {
    var search = $("input").val();
    Router.go('subPostsList', {sub: search});
  },
  'click .load-next': function(e) {
    var page = parseInt(Session.get('page')) || 0;
    page += 1;
    RedditPosts.remove({}, function() {
      Meteor.call('getNextPage', function(error, result) {
        _.each(result, function(item) {
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
        });
      });
    });
    var sub = Session.get('currentSub');
    if (sub) {
      Router.go('subPostsList', {sub: sub, page: page});
    } else {
      Router.go('postsList', {page: page});
    }
  },
  'click .load-prev': function(e) {
    var page = parseInt(Session.get('page')) - 1;
    RedditPosts.remove({}, function() {
      Meteor.call('getPrevPage', function(error, result) {
        _.each(result, function(item) {
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
        });
      });
    });
    var sub = Session.get('currentSub');

    if (page === 0) {
      delete Session.keys['page'];
      if (sub) {
        Router.go('subPostsList', {sub: sub});
      } else {
        Router.go('postsList');
      }
    } else {
      if (sub) {
        Router.go('subPostsList', {sub: sub, page: page});
      } else {
        Router.go('postsList', {page: page});
      }
    }
  },
  'click .youtube-playlist': function(e) {
    console.log('hi');
    var redditPosts = this.posts.collection._docs._map;
    var urlArr;
    var idIndex;
    var id;
    var idArr = [];
    _.each(redditPosts, function (post) {
      if (post.domain.indexOf('youtube.com') !== -1) {
        urlArr = post.url.match(/[\w-]+/g);
        idIndex = urlArr.indexOf('v') + 1;
        id = urlArr[idIndex].slice(0,11);
        if (id !== 'http' && id !== 'https') {
          idArr.push(id);
        }
      }
    });

    Router.go('/youtube/' + idArr);
  }
});
