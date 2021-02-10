// Configurable numbers
const TOTAL_FILMS_TO_DISPLAY = 3;
const FILM_TITLE_CHARACTER_LIMIT = 32;
const qFeedLatestFilms = document.querySelector("#sidebar-recent-films");

fetch(`https://api.bricksinmotion.com/feed/?total=${TOTAL_FILMS_TO_DISPLAY}`)
  .then((r) => r.json())
  .then((json) => {
    let final = json.map(makeHTML).join("");
    qFeedLatestFilms.insertAdjacentHTML("beforeend", final);
    qFeedLatestFilms.classList.add("loaded");
  });

function makeHTML(film) {
  // Trim the film title if it is too long
  let film_title = film.title;
  if (film.title.length > FILM_TITLE_CHARACTER_LIMIT) {
    film_title = film.title.substr(0, FILM_TITLE_CHARACTER_LIMIT) + "...";
  }

  return `<article class="m-article-card post feed-film">
    <div class="m-article-card__picture lozad loaded" data-background-image="https://bricksinmotion.com/films/images/${film.thumbnail}" style="background-image: url(&quot;https://bricksinmotion.com/films/images/${film.thumbnail}&quot;);">
      <a href="https://bricksinmotion.com/films/view/${film.id}/" class="m-article-card__picture-link" aria-label="Article"></a>
    </div>
      <div class="m-article-card__info no-tag">
      <a href="https://bricksinmotion.com/films/view/${film.id}/" class="m-article-card__info-link">
        <div>
          <h2 class="m-article-card__title js-article-card-title " title="${film.title}">
            ${film_title}
          </h2>
        </div>
        <div class="m-article-card__timestamp">
          <span>${film.user_name}</span>
        </div>
      </a>
    </div>
  </article>`;
}
