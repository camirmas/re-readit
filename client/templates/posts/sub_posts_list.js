Template.subPostsList.events({
  'click .find-sub': function(e) {
    var search = $("input").val();
    $("input").val("");
    Router.go('subPostsList', {sub: search});
  },
  'click .load-more': function(e) {
    var page = $(e.target).data('page');
    $(e.target).data('page', page);
    Router.go('subPostsList', {sub: this.sub, page: page});
  }
});
