Template.userPublic.helpers({
  boards: function() {
    return Boards.find();
  },
  user: function() {
    return Meteor.users.findOne();
  }
});
