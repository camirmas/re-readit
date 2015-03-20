Template.postsList.events({
  'click .find-sub': function(e) {
    var search = $("input").val();
    Router.go('subPostsList', {sub: search});
  },
  'click .load-more': function(e) {
    var page = $(e.target).data('page') + 1;
    $(e.target).data('page', page);
    Router.go('postsList', {page: page});
  },
  'click .youtube-playlist': function(e) {
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
