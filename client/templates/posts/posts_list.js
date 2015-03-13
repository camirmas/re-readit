Template.postsList.events({
  'click .find-sub': function(e) {
    var search = $("input").val();
    Router.go('subPostsList', {sub: search});
  },
  'click .load-more': function(e) {
    var page = $(e.target).data('page') + 1;
    $(e.target).data('page', page);
    Router.go('postsList', {page: page});
  }
});
