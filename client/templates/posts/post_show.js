Template.postShow.helpers({
  postSaved: function() {
    // console.log(Boards.findOne({userId: Meteor.user()._id}));
    return !!Posts.findOne().boardId;
  }
});
