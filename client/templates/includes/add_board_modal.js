Template.addBoardModal.events({
  'click .add-board-button': function(e) {
    e.preventDefault();
    var name = $(".board-name").val();

    Meteor.call('boardInsert', name, function(err, res) {
      if (err) {
        $(".board-form .item").addClass("error");
        $(".board-name").attr("placeholder", err.reason);
      } else {
        $('*[data-dismiss="modal"]').trigger('click');
      }
    });
  },
  'click .cancel': function(e) {
    $('*[data-dismiss="modal"]').trigger('click');
  }
});
