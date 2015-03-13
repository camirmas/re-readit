Package.describe({
  summary: "imgur package",
  version: "0.1.0",
  name: "imgur"
});

Package.onUse(function(api) {
  api.addFiles('imgur.js', 'server');
  api.export('Imgur');
});
