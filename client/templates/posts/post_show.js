Template.postShow.helpers({
  postSaved: function() {
    return !!Posts.findOne().boardId
  }
});
