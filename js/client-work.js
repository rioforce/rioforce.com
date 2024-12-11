import { fetchTextFile } from "./fetch-files.js";

export function updatePageTitle(title) {
  let pipe_index = document.title.indexOf("|") + 1;

  // We want to remove the extra text added earlier
  if (!title) {
    document.title = document.title.substr(pipe_index);
    return true;
  }

  // We have a blank title, simply append it
  if (document.title.indexOf("|") === -1) {
    document.title = `${title} | ${document.title}`;
    return true;
  }

  // A title has already been added, replace it with the new one
  document.title = `${title} | ${document.title.substr(pipe_index)}`;
  return true;
}

function removeFilmDetail() {
  updatePageTitle();
  function _end() {
    this.removeEventListener("transitionend", _end);
    this.parentElement.removeChild(this);
  }

  let qFilmDetail = document.querySelector(".film-detail");
  qFilmDetail.addEventListener("transitionend", _end);
  qFilmDetail.classList.remove("visible");
}

function addFilmDetail(qFilmRow, film, name, page) {
  // Insert the container for the film details
  qFilmRow.insertAdjacentHTML(
    "afterend",
    `<div class="film-detail film-${film}"></div>`
  );
  let qFilmDetail = document.querySelector(`.film-detail.film-${film}`);

  // The page was successfully loaded, insert it
  qFilmDetail.insertAdjacentHTML("afterbegin", page);
  qFilmDetail.classList.add("visible");

  // Update browser elements
  window.location.hash = film;
  updatePageTitle(name);
}

export function loadPage(qFilm) {
  // Extract the file name for this film and the row it is on
  let qFilmRow = qFilm.parentElement;
  let filmPage = qFilm.id;
  let filmName = qFilm.dataset.title;

  // If a film detail is already on the page, we need to remove it
  let qOldFilmDetail = document.querySelector(".film-detail");
  if (qOldFilmDetail) {
    removeFilmDetail();

    // If the same film visible was clicked, we only remove it
    // and not do any more loading
    if (qOldFilmDetail.classList.contains(`film-${filmPage}`)) {
      return false;
    }
  }

  // Fetch the film's page
  fetchTextFile(`../pages/${filmPage}.html`).then((data) => {
    addFilmDetail(qFilmRow, filmPage, filmName, data);
  });
}

export function onSiteLoad(filmPage) {
  // We do not have film to load, abort
  if (filmPage === null) {
    return false;
  }

  // Abort if this is not a film
  let qFilm = document.querySelector(`#${filmPage}`);
  if (qFilm && !qFilm.classList.contains("film")) {
    return false;
  }

  // We have a film, load it
  loadPage(qFilm);
}
