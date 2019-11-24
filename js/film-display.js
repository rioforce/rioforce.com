/*
 * Created 2015-2019 Caleb Ely
 * <https://CodeTri.net>
 */


(function() {
  "use strict";
  var CONSTANTS = {
    API_KEY: "AIzaSyAnp7CY0EJ0o0elDINC7WmROmJiY2T-Clw",
    FILMS_IN_ROW: 3,
    NUM_OF_VIDEOS: (document.documentElement.clientWidth > 500 ? 6 : 3)  //CHANGE THIS TO ADD ROW OTHER ETC
  };


  function _findParent(ele, _class) {
    // The desired element was not found on the page
    if (ele === null) {
      return null;
    }

    // We found the desired element
    if (ele.classList.contains(_class)) {
      return ele;

      // Keep searching for the element
    } else {
      return _findParent(ele.parentElement, _class);
    }
  }

  function _isSame(oldArea, newArea) {
    return oldArea === newArea;
  }

  function insertFilms(films) {
    var div      = null,
        qWrapper = document.querySelector(".film-row-wrapper");

    // If there are films already visible, remove them
    if (qWrapper.children.length >= 1) {
      while (qWrapper.firstChild) {
        qWrapper.removeChild(qWrapper.firstChild);
      }
    }

    // Add each film to the page
    films.forEach(function(v, i) {
      // Only x films to a row
      if (i % CONSTANTS.FILMS_IN_ROW === 0) {
        div = document.createElement("div");
        div.classList.add("film-row");
        qWrapper.insertAdjacentElement("beforeend", div);
      }

      div.insertAdjacentHTML("beforeend", v.html);
    });
  }

  function generateFilmReel(data) {
    // Get the template for the film thumbnail
    fetch("templates/film.html")
    .then(function(r) { return r.text(); })
    .then(function(html) {
      // Generate a thumbnail for each video
      var films = [];
      data.items.forEach(function(v, i) {
        v = v.snippet;

        // If a maxres thumbnail is not available,
        // fallback to a medium-sized image (medium because they are letterboxed
        // and keep the wide-screen aspect ratio)
        var filmThumbnail = v.thumbnails.maxres || v.thumbnails.medium;

        var film = new Film(i, v.title, v.resourceId.videoId,
                            v.playlistId, filmThumbnail);
        film.compile(html);
        films.push(film);
      });

      insertFilms(films);
    });
  }

  function loadVideos(e) {
    var qBtn = _findParent(e.target, "btn-playlist-toggle"),
        qActiveBtn = document.querySelector(".btn-row .btn.active");

    // A playlist toggle button was not clicked
     if (qBtn === null) {
      return false;
    }

    // The playlist has been changed from the default
    if (qActiveBtn) {
      // Do not attempt to load an already visible playlist
      if (_isSame(qActiveBtn.id, qBtn.id)) {
        return false;
      }

      // Remove the old active button styling
      qActiveBtn.classList.remove("active");
    }

    // Indicate which playlist we are viewing
    qBtn.classList.add("active");

    // Load videos for the specified playlist from the YouTube API
    fetch("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=" +
          CONSTANTS.NUM_OF_VIDEOS + "&playlistId=" + qBtn.dataset.id +
          "&fields=items(snippet(playlistId%2CresourceId(playlistId%2CvideoId)%2Cthumbnails%2Ctitle))&key=" +
          CONSTANTS.API_KEY)
    .then(function(r) { return r.json(); })
    .then(generateFilmReel);
  }

  // Duplicate this and a thing in the HTML to add another section
  document.querySelector("#btn-client").addEventListener("click", loadVideos);
  document.querySelector("#btn-shortfilms").addEventListener("click", loadVideos);
  document.querySelector("#btn-tut-bts").addEventListener("click", loadVideos);

  // Load the short films playlist on page load
  document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("#btn-shortfilms").click();
  });

  // Automatically play hero video background on tablet-sized and larger screens
  if (document.documentElement.clientWidth >= 768) {
    document.querySelector("video.fullscreen").setAttribute("autoplay", "true");
  }
}());
