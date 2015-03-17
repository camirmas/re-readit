Reddit = {
  prevPage: '',
  nextPage: '',
  callUrl: ''
};

Reddit.getPosts = function(link) {
  console.log("calling");
  var posts = Meteor.http.get(link, {
      params: {}
    }
  );

  if (posts.statusCode === 200) {
    Reddit.callUrl = link;
    Reddit.nextPage = posts.data.data.after;
    return posts.data.data.children;
  }
};

Reddit.getNextPage = function() {
  console.log("calling next");
  var posts = Meteor.http.get(Reddit.callUrl, {
    params: {
      after: Reddit.nextPage,
      count: 25
    }
  });

  if (posts.statusCode === 200) {
    Reddit.prevPage = posts.data.data.before;
    Reddit.nextPage = posts.data.data.after;
    return posts.data.data.children;
  }
}

Reddit.getPrevPage = function() {
  var posts = Meteor.http.get(Reddit.callUrl, {
    timeout: 5000,
    params: {
      before: Reddit.prevPage
    }
  });

  if (posts.statusCode === 200) {
    Reddit.prevPage = posts.data.before;
    Reddit.nextPage = posts.data.after;
    return posts.data.data.children;
  }
}

Meteor.methods({
  'getPosts': function(link) {
    return Reddit.getPosts(link);
  },
  'getNextPage': function() {
    return Reddit.getNextPage();
  },
  'getPrevPage': function() {
    return Reddit.getPrevPage();
  }
});
