Template.youtubePlaylist.events({
  'click .next-video': function(e) {
    player.nextVideo();
  },
  'click .previous-video': function(e) {
    player.previousVideo();
  },
})

Template.youtubePlaylist.rendered = function() {
  if (Meteor.isClient) {
    var playlistIds = this.data.split(',');
    console.log(playlistIds);
    onYouTubeIframeAPIReady = function () {
      player = new YT.Player("playlist-player", {
        height: "400",
        width: "600",
        events: {
          'onReady': onPlayerReady
        }
      });
    };

    function onPlayerReady(event) {
      player.loadPlaylist({playlist: playlistIds, index: 0});
    }

    YT.load();
  }
}
