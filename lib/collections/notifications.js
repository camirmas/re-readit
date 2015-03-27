Notifications = new Mongo.Collection("notifications");

  Notifications.allow({
    update: function() {
     return true;
    }
  });

  createBoardNotification = function(boardName) {
    var user = Meteor.user();
    var board = Boards.findOne({name: boardName});
    var followers = Followers.findOne({userId: user._id});
    var notification = {
      userId: user._id,
      userName: user.username,
      followers: followers.users,
      boardCreated: true,
      postAdded: false,
      startedFollowing: false,
      boardId: board._id,
      boardName: boardName,
      read: false,
      createdAt: new Date().valueOf()
    };
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
      startedFollowing: false,
      boardId: boardId,
      boardName: board.name,
      read: false,
      createdAt: new Date().valueOf()
    }
    Notifications.insert(notification);
  };

  followNotification = function(toFollow) {

    var currentUser = Meteor.user();
    var user = Meteor.users.findOne(toFollow);

    var notification = {
      userId: currentUser._id,
      userName: currentUser.username,
      followers: toFollow,
      boardCreated: false,
      postAdded: false,
      startedFollowing: true,
      boardId: null,
      boardName: null,
      read: false,
      createdAt: new Date().valueOf()
    }

    Notifications.insert(notification);
  }
