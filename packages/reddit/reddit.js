Reddit = {};

Reddit.getPosts = function(link) {
  var posts = Meteor.http.get(link, {
      timeout: 5000,
      params: {}
    }
  );

  if (posts.statusCode === 200) {
    return posts.data.data.children;
  }
};

Meteor.methods({
  'getPosts': function(link) {
    return Reddit.getPosts(link);
  }
});
