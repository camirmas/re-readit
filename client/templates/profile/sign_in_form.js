Template.signInForm.events({
  'click .sign-in-complete': function() {
    var username = $('.username').val();
    var password = $('.password').val();

    Meteor.loginWithPassword(username, password, function(err) {
      if (err) {
        console.log(err);
      } else if ($('*[data-dismiss="modal"]').length === 1){
        $('*[data-dismiss="modal"]').trigger('click');
      } else {
        Router.go('userPublic', {_id: Meteor.user()._id});
      }
    });
  }
});
