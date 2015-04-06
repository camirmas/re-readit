Reddit = {
  prevPage: '',
  nextPage: '',
  callUrl: ''
};

Reddit.getPost = function(link) {
  var post = Meteor.http.get(link)

  if (post.statusCode === 200) {
    return post.data[0].data.children[0].data;
  }
}

Reddit.getPosts = function(link) {
  var posts = Meteor.http.get(link);

  if (posts.statusCode === 200) {
    Reddit.callUrl = link;
    Reddit.nextPage = posts.data.data.after;
    return posts.data.data.children;
  }
};

Reddit.getNextPage = function() {
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
  'getPost': function(link) {
    return Reddit.getPost(link);
  },
  'getPosts': function(link) {
    return Reddit.getPosts(link);
  },
  'getNextPage': function() {
    return Reddit.getNextPage();
  },
  'getPrevPage': function() {
    return Reddit.getPrevPage();
  },
  'getText': function(url) {
    var redditUrl = 'http://www.reddit.com' + url
    var redditPage = Meteor.http.get(redditUrl);
    var cheerio = Meteor.npmRequire('cheerio');
    var $ = cheerio.load(redditPage.content);
    var counter = 0;
    var text;
    $('.usertext-body').each(function() {
      if (counter == 1) {
        text = ($(this).html());
      }
      counter += 1;
    });
    return text;
  }
});
