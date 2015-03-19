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
    var post = Session.get('currentPost');
    post.boardId = board._id;
    Meteor.call('saveToBoard', post, function(err, res) {
      if (err) {
        $(".board-form .item").addClass("error");
        $(".board-name").attr("placeholder", err.reason);
      } else {
        $('*[data-dismiss="modal"]').trigger('click');
      }
    });
  }
});
