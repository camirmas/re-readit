Package.describe({
  summary: "reddit package",
  version: "0.1.0",
  name: "reddit"
});

Package.onUse(function(api) {
  api.addFiles('reddit.js', 'server');
  api.export('Reddit');
});
