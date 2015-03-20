Template.youtubeShow.rendered = function() {
  $("img").remove();
  if (Meteor.isClient) {
    var id = $(".video").data('id');
    onYouTubeIframeAPIReady = function () {
      player = new YT.Player("player", {
        height: "400",
        width: "600",
        videoId: id,
        events: {
          onReady: function (event) {
            event.target.loadVideo();
          }
        }
      });
    };

    YT.load();
  }
}
