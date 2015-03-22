Boards = new Mongo.Collection('boards');

Meteor.methods({
  boardInsert: function(name) {
    check(name, String);
    check(this.userId, String);

    if (!name) {
      throw new Meteor.Error('invalid-board', "You must set a name for your board");
    }

    var user = Meteor.user();
    Boards.insert({name: name, userId: user._id});
  },
  boardDelete: function(board) {
    check(board._id, String);

    Boards.remove(board._id);
  },
  boardUpdate: function(board, input) {
    check(board, Object);
    check(input, String);

    if (input.trim() === "") {
      throw new Meteor.Error('invalid-input', "Cannot be blank");
    }

    Boards.update(board, {$set: {name: input}});
  }
});
