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
    var idIndex;
    var id;
    var idArr = [];
    _.each(redditPosts, function (post) {
      if (post.domain.indexOf('youtube') !== -1) {
        idIndex = post.url.match(/[\w-]+/g).indexOf('v') + 1;
        id = post.url.match(/[\w-]+/g)[idIndex];
        if (id !== 'http' && id !== 'https') {
          idArr.push(id);
        }
      }
    });

    Router.go('/youtube/' + idArr);
  }
});
