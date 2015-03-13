Template.postsList.events({
  'click .find-sub': function(e) {
    var search = $("input").val();
    Router.go('subPostsList', {sub: search});
  },
  'click .load-more': function(e) {
    var page = parseInt($(e.target).attr('href'));
    $(e.target).attr('href', page + 1);
  }
});
