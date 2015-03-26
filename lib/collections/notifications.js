Notifications = new Mongo.Collection("notifications");

  createBoardNotification = function(boardName) {
    var user = Meteor.user();
    var followers = Followers.findOne({userId: user._id})
    var notification = {
      userId: user._id,
      userName: user.username,
      followers: followers.users,
      boardCreated: true,
      postAdded: false,
      boardName: boardName
    }
    Notifications.insert(notification);
  };

  addPosttoBoardNotification = function(boardId) {
    var board = Boards.findOne(boardId);
    var user = Meteor.user();
    var followers = Followers.findOne({userId: user._id})
    var notification = {
      userId: user._id,
      userName: user.username,
      followers: followers.users,
      boardCreated: false,
      postAdded: true,
      boardName: board.name
    }
    Notifications.insert(notification);
  }
