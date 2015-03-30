Template.autocomplete.events({
  'click .name-label': function(e) {
    var username = $(e.target).text();
    var user = Meteor.users.findOne({username: username});
    Router.go('userPublic', {_id: user._id});
  }
})
