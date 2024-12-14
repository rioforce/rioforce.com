import { loadPage } from "./client-work.js";

// Determine the client and load the partial HTML page
window.addEventListener("DOMContentLoaded", function () {
  loadPage(document.querySelector(".film"));
});
