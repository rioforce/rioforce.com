import { loadPage, onSiteLoad } from "./client-work.js";
import { find_parent } from "./find-parent.js";

function years_since(year, month, day) {
  // Get the current date
  const currentDate = new Date();
  let now = {
    day: currentDate.getUTCDate(),
    year: currentDate.getUTCFullYear(),
    month: currentDate.getUTCMonth() + 1, // month is zero-based
  };

  // Calculate the years of exp
  let diff = now.year % year;

  // If the current month is less than the given month OR
  // the current month is the same as the given month AND
  // the current dat is less than the given day,
  // the year exp is one year too many, so we need to correct it
  if (now.month < month || (now.month === month && now.day < day)) {
    diff -= 1;
  }
  return diff.toString();
}

// Go to the client work subpage if we're on a smaller screen
let is_small_screen = window.getComputedStyle(
  document.querySelector("body"),
  "::before"
).content;
if (is_small_screen === "none") {
  // A film was possibly clicked
  document
    .querySelector(".featuredon")
    ?.addEventListener("click", function (e) {
      // Find the container element for this film
      let qFilm = find_parent(e.target, ".film");

      // Nope, no film was clicked
      if (qFilm === null) {
        return false;
      }
      e.preventDefault();
      loadPage(qFilm);
    });
}

window.addEventListener("DOMContentLoaded", function () {
  // The user is loading a specific film,
  // get the hash and attempt to load it
  let film = null;
  if (window.location.hash !== "") {
    film = window.location.hash.match(/#([a-z-]*?)$/i)[1].toLowerCase();
  }
  onSiteLoad(film);

  // How many years have I been brickfilming?
  const q_years_since = document.querySelector("#years-since");
  if (q_years_since) {
    q_years_since.textContent = years_since(2007, 12, 10);
  }

  // Automatically play hero video background on tablet-sized and larger screens
  if (document.documentElement.clientWidth >= 768) {
    document.querySelector("video.fullscreen").setAttribute("autoplay", "");
  }
});
