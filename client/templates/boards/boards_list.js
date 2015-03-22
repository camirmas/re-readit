Template.boardsList.helpers({
  boards: function() {
    return Boards.find();
  }
});

Template.boardsList.events({
  'click .add-board': function(e) {
    if (!Meteor.user()) {
      e.preventDefault();
      Router.go('/profile');
    }
  }
});
