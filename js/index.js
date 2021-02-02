import { load_page, on_site_load } from "./client-work.js";
import { find_parent } from "./find-parent.js";

// A film was possibly clicked
document.querySelector(".featuredon").addEventListener("click", function (e) {
  e.preventDefault();
  // Find the container element for this film
  let qFilm = find_parent(e.target, ".film");

  // Nope, no film was clicked
  if (qFilm === null) {
    return false;
  }

  // Load the film
  load_page(qFilm);
});

window.addEventListener("DOMContentLoaded", function () {
  let film = null;
  // The user is loading a specific film,
  // get the hash and attempt to load it
  if (window.location.hash !== "") {
    film = window.location.hash.match(/#([a-z-]*?)$/i)[1].toLowerCase();
  }
  on_site_load(film);
});
