Template.subPostsList.events({
  'click button': function(e) {
    var search = $("input").val();
    Router.go('subPostsList', {sub: search});
  }
});
