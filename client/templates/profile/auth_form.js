Template.authForm.events({
  'click .to-sign-up': function() {
    $('#sign-in').addClass('hidden');
    $('#sign-up').removeClass('hidden');
  },
  'click .to-sign-in': function() {
    $('#sign-up').addClass('hidden');
    $('#sign-in').removeClass('hidden');
  }
});
