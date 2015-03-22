Template.boardCard.helpers({
  coverImage: function() {
    var post = Posts.findOne({boardId: this._id});
    if (post) {
      return post.thumbnail;
    }
    return "http://placehold.it/600x400&text=hello+:)";
  }
});

Template.boardCard.events({
  'click .board-delete': function() {
    var _this = this;
    if (confirm("Are you sure you want to delete this?")) {
      Posts.find({boardId: this._id}).forEach(function(post) {
        Meteor.call('postDelete', post);
      });
      Meteor.call('boardDelete', _this);
    }
  },
  'click .board-edit': function(e) {
    $(e.target).parent().next('.board-edit-form').find('.name-input').val(this.name);
    $(e.target).parent().next('.board-edit-form').removeClass('hidden');
  },
  'click .cancel-update': function(e) {
    $('.board-edit-form').addClass('hidden');
  },
  'click .complete-update': function(e) {
    var input = $(e.target).prev().find('.name-input').val();
    Meteor.call('boardUpdate', this, input);
    $('.name-input').val("");
    $('.board-edit-form').addClass('hidden');
  }
});
