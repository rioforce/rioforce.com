import { load_page } from "./client-work.js";

// Determine the client and load the partial HTML page
window.addEventListener("DOMContentLoaded", function () {
  load_page(document.querySelector(".film"));
});
