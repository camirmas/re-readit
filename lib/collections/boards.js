Boards = new Mongo.Collection('boards');

Meteor.methods({
  boardInsert: function(name) {
    check(name, String);

    if (!name) {
      throw new Meteor.Error('invalid-board', "You must set a name for your board");
    }

    Boards.insert({name: name});
  },
  boardDelete: function(board) {
    check(board._id, String);

    Boards.remove(board._id);
  }
});
