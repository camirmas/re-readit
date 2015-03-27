Template.signUpForm.events({
  'click .sign-up-complete': function() {
    var username = $('.sign-up-username').val();
    var password = $('.sign-up-password').val();
    var passwordConf = $('.password-confirmation').val();

    if (password !== passwordConf) {
      throw new Meteor.Error("invalid-signup", "doesn't match: " + password + " " + passwordConf);
      return;
    }

    var user = {
      username: username,
      password: password
    }

    Accounts.createUser(user, function(error) {
      if (error) {
        console.log(error);
      } else {
        Meteor.call('createFollowers', Meteor.user()._id);
        Meteor.call('createFollowing', Meteor.user()._id);
        
        if ($('*[data-dismiss="modal"]').length === 1) {
          $('*[data-dismiss="modal"]').trigger('click');
        } else {
          Router.go('userPublic', {_id: Meteor.user()._id});
        }
      }
    });
  }
});
