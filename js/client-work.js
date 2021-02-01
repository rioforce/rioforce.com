export function update_page_title(title) {
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

function remove_film_detail() {
  function _end() {
    this.removeEventListener("transitionend", _end);
    this.parentElement.removeChild(this);
    update_page_title();
  }

  let qFilmDetail = document.querySelector(".film-detail");
  qFilmDetail.addEventListener("transitionend", _end);
  qFilmDetail.classList.remove("visible");
}

function add_film_detail(qFilmRow, film, name, page) {
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
  update_page_title(name);
}

export function load_page(qFilm) {
  // Extract the file name for this film and the row it is on
  let qFilmRow = qFilm.parentElement;
  let filmPage = qFilm.id;
  let filmName = qFilm.children[1].textContent;

  // If a film detail is already on the page, we need to remove it
  let qOldFilmDetail = document.querySelector(".film-detail");
  if (qOldFilmDetail) {
    remove_film_detail();

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
      add_film_detail(qFilmRow, filmPage, filmName, data);
    });
}

export function on_site_load(filmPage) {
  // We do not have film to load, abort
  if (filmPage === null) {
    return false;
  }

  // Abort if this is not a film
  let qFilm = document.querySelector(`#${filmPage}`);
  if (!qFilm.classList.contains("film")) {
    return false;
  }

  // We have a film, load it
  load_page(qFilm);
}
