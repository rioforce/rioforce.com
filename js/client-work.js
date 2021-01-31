import { find_parent } from "./find-parent.js";

function __updatePageTitle(title) {
  let barLoc = document.title.indexOf("|") + 1;

  // We want to remove the extra text added earlier
  if (!title) {
    document.title = document.title.substr(barLoc);
    return true;
  }

  // We have a blank title, simply append it
  if (document.title.indexOf("|") === -1) {
    document.title = `${title} | ${document.title}`;
    return true;
  }

  // A title has already been added, replace it with the new one
  document.title = `${title} | ${document.title.substr(barLoc)}`;
  return true;
}

function removeFilmDetail() {
  function _end() {
    this.removeEventListener("transitionend", _end);
    this.parentElement.removeChild(this);
    __updatePageTitle();
  }

  var qFilmDetail = document.querySelector(".film-detail");
  qFilmDetail.addEventListener("transitionend", _end);
  qFilmDetail.classList.remove("visible");
}

function addFilmDetail(qFilmRow, film, name, page) {
  // Insert the container for the film details
  qFilmRow.insertAdjacentHTML(
    "afterend",
    `<div class="film-detail film-${film}"></div>`
  );
  var qFilmDetail = document.querySelector(`.film-detail.film-${film}`);

  // The page was successfully loaded, insert it
  qFilmDetail.insertAdjacentHTML("afterbegin", page);
  qFilmDetail.classList.add("visible");

  // Update browser elements
  window.location.hash = film;
  __updatePageTitle(name);
}

function __loadPage(qFilm) {
  // Extract the file name for this film and the row it is on
  var qFilmRow = qFilm.parentElement,
    filmPage = qFilm.id,
    filmName = qFilm.children[1].textContent;

  // If a film detail is already on the page, we need to remove it
  var qOldFilmDetail = document.querySelector(".film-detail");
  if (qOldFilmDetail) {
    removeFilmDetail();

    // If the same film visible was clicked, we only remove it
    // and not do any more loading
    if (qOldFilmDetail.classList.contains(`film-${filmPage}`)) {
      return false;
    }
  }

  // Fetch the film's page
  fetch(`../pages/${filmPage}.html`)
    .then((r) => r.text())
    .then((data) => {
      addFilmDetail(qFilmRow, filmPage, filmName, data);
    });
}

function __onSiteLoad(filmPage) {
  // We do not have film to load, abort
  if (filmPage === null) {
    return false;
  }

  // Abort if this is not a film
  var qFilm = document.querySelector(`#${filmPage}`);
  if (!qFilm.classList.contains("film")) {
    return false;
  }

  // We have a film, load it
  __loadPage(qFilm);
}

// A film was possibly clicked
document.querySelector(".featuredon").addEventListener("click", function (e) {
  // Find the container element for this film
  var qFilm = find_parent(e.target, ".film");

  // Nope, no film was clicked
  if (qFilm === null) {
    return false;
  }

  // Load the film
  __loadPage(qFilm);
});

window.onload = function () {
  var film = null;
  // The user is loading a specific film,
  // get the hash and attempt to load it
  if (window.location.hash !== "") {
    film = window.location.hash.match(/#([a-z-]*?)$/i)[1].toLowerCase();
  }
  __onSiteLoad(film);
};
