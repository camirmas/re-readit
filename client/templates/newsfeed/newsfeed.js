Template.newsfeed.helpers({
  notifications: function() {
    var userId = Meteor.user()._id;
    return Notifications.find({followers: userId});
  },
  userId: function() {
    return this.userId;
  },
  boardId: function() {
    return this.boardId;
  },
  date: function() {
    var now = parseInt(+new Date());
    var date = parseInt(this.createdAt);
    var difference = now - date
    var minutes = Math.round((difference/1000)/60) ;
    var hours = Math.round((difference/1000)/60/60);
    var days = Math.round((difference/1000)/60/60);

    if (minutes < 60) {
      return minutes + ' minutes ago';
    }
    else if (hours < 24) {
      return hours + ' hours ago';
    }
    else {
      return days + ' days ago';
    }
  }
});
