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

    var user = Meteor.user();
    if (ownsDocument(user._id, board)) {
      Boards.remove(board._id);
    } else {
      throw new Meteor.Error('invalid-userId', "You cannot delete this user's board");
    }
  },
  boardUpdate: function(board, input) {
    check(board, Object);
    check(input, String);

    if (input.trim() === "") {
      throw new Meteor.Error('invalid-input', "Cannot be blank");
    }

    var user = Meteor.user();
    if (ownsDocument(user._id, board)) {
      Boards.update(board, {$set: {name: input}});
    } else {
      throw new Meteor.Error('invalid-userId', "You cannot edit this user's board");
    }
  }
});
