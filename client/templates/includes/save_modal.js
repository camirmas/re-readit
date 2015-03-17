Template.saveModal.helpers({
  boards: function() {
    return Boards.find();
  }
});

Template.saveModal.events({
  'click .item-radio': function(e) {
    $('.item-radio').removeClass('selected');
    $(e.target).closest('.item-radio').addClass('selected');
  },
  'click .save-button': function(e, template) {
    e.preventDefault();

    var selected = $('.selected').text().trim();
    var board = Boards.findOne({name: selected});
    var post = {
      content: Session.get('currentPost'),
      boardId: board._id
    };
    Meteor.call('saveToBoard', post);
  }
});
