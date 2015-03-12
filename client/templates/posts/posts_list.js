Template.postsList.events({
  'click .find-sub': function(e) {
    var search = $("input").val();
    Router.go('subPostsList', {sub: search});
  }
});
