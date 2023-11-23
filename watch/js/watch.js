import { setYearInFooter } from "../../js/footer.js";

function fetchHtmlFile(file) {
    return fetch(file)
        .then(response => response.text())
        .catch(error => console.error(`Error loading file ${file}:`, error));
}

window.addEventListener("DOMContentLoaded", () => {
    // Load the site nav and footer
    fetchHtmlFile("/watch/templates/nav.html").then((html) => {
        document.querySelector("#site-nav").innerHTML = html;
    });
    fetchHtmlFile("/watch/templates/footer.html").then((html) => {
        document.querySelector("#site-footer").innerHTML = html;

        // Set the current year in the footer
        setYearInFooter();
    });
});

