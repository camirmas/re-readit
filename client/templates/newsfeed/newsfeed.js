Template.newsfeed.helpers({
  notifications: function() {
    var userId = Meteor.user()._id;
    return Notifications.find({followers: userId}).fetch().reverse();
  },
  userId: function() {
    return this.userId;
  },
  userImg: function() {
    return Meteor.users.findOne(this.userId).userImg;
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
    var days = Math.round((difference/1000)/60/60/24);

    if (minutes < 60) {
      if (minutes === 1) {
        return minutes + ' minute ago';
      }
      else {
        return minutes + ' minutes ago';
      }
    }
    else if (hours < 24) {
      if (hours === 1) {
        return hours + ' hour ago';
      }
      else {
        return hours + ' hours ago';
      }
    }
    else {
      if (days === 1) {
        return days + ' day ago';
      }
      return days + ' days ago';
    }
  }
});
