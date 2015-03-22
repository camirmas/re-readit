Template.signInForm.events({
  'click .sign-in-complete': function() {
    var username = $('.username').val();
    var password = $('.password').val();

    Meteor.loginWithPassword(username, password, function(err) {
      if (err) {
        console.log(err);
      } else {
        $('*[data-dismiss="modal"]').trigger('click');
      }
    });
  }
});
