Imgur = {
  auth: 'Client-ID ' + Meteor.settings.imgur_key
};

Imgur.getImage = function(id) {
  var image = Meteor.http.get("https://api.imgur.com/3/image/" + id, {
    headers: {
      'Authorization': Imgur.auth
    }
  });

  return image.data.data.link;
}

Imgur.getGallery = function(id) {
  var image = Meteor.http.get("https://api.imgur.com/3/gallery/" + id + '/.json', {
    headers: {
      'Authorization': Imgur.auth
    }
  });

  return image.data.data.images;
}

Imgur.getAlbum = function(id) {
  var image = Meteor.http.get("https://api.imgur.com/3/album/" + id + "/images", {
    headers: {
      'Authorization': Imgur.auth
    }
  });

  return image.data.data;
}

Meteor.methods({
  getImage: function(id) {
    return Imgur.getImage(id);
  },
  getGallery: function(id) {
    return Imgur.getGallery(id);
  },
  getAlbum: function(id) {
    return Imgur.getAlbum(id);
  }
});
