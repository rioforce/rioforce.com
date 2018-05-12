function Film(id, title, url, playlist, thumbnail) {
  "use strict";
  this.id = "film-" + id;
  this.url = "https://www.youtube.com/watch?v=" + url + "&list=" + playlist
  this.title = title;
  this.thumbnail = thumbnail;
  this.html = null;
};

Film.prototype.TITLE_LENGTH = 47;

Film.prototype.compile = function(html) {
  "use strict";
  html = html.replace(/:film-id:/g, this.id);
  html = html.replace(/:film-url:/g, this.url);
  html = html.replace(/:film-image-url:/g, this.thumbnail.url);

  // Chop off all title text after the dot
  if (this.title.indexOf("•") > -1) {
    this.title = this.title.slice(0, this.title.indexOf("•"));
  }

  // If the title is too long, cut it off and add ellipsis to indicate such
  if (this.title.length > this.TITLE_LENGTH) {
    this.title = this.title.substr(0, this.TITLE_LENGTH) + "...";
  }

  html = html.replace(/:film-title:/g, this.title);
  this.html = html;
};
