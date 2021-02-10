import { load_page, on_site_load } from "./client-work.js";
import { find_parent } from "./find-parent.js";

// Go to the client work subpage if we're on a smaller screen
let is_small_screen = window.getComputedStyle(document.querySelector("body"), "::before").content;
if (is_small_screen === "none") {
  // A film was possibly clicked
  document.querySelector(".featuredon").addEventListener("click", function (e) {
    // Find the container element for this film
    let qFilm = find_parent(e.target, ".film");

    // Nope, no film was clicked
    if (qFilm === null) {
      return false;
    }
    e.preventDefault();
    load_page(qFilm);
  });
}

window.addEventListener("DOMContentLoaded", function () {
  // The user is loading a specific film,
  // get the hash and attempt to load it
  let film = null;
  if (window.location.hash !== "") {
    film = window.location.hash.match(/#([a-z-]*?)$/i)[1].toLowerCase();
  }
  on_site_load(film);
});
