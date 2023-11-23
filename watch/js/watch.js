import { setYearInFooter } from "../../js/footer.js";
import { fetchHtmlFile } from "../../js/fetch-files.js";

window.addEventListener("DOMContentLoaded", async () => {
    // Load the site nav and footer
    document.querySelector("#site-nav").innerHTML = (await fetchHtmlFile("/watch/templates/nav.html"));
    document.querySelector("#site-footer").innerHTML = (await fetchHtmlFile("/watch/templates/footer.html"));

    // Set the current year in the footer
    setYearInFooter();
});

