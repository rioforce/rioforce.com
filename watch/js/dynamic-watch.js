import { fetchTextFile, fetchJsonFile } from "../../js/fetch-files.js";

function loadVideoInfo() {
  // Load data from an external JSON file (e.g., videoinfo.json)
  fetchJsonFile("videoinfo.json")
    .then((data) => {
      // Set the video metadata
      document.querySelector("#pageTitle").textContent = data.title;
      document.querySelector("#film-title").textContent = data.title;
      document.querySelector("#film-date").textContent = data.date;

      // Pull in and render the video description
      fetchTextFile(data.description).then((markdown) => {
        document.querySelector("#article-description").innerHTML =
          marked.parse(markdown);
      });

      // Load video information from external JSON file
      loadYouTubeVideo(data.youtubeLink);

      // Load profile information from external JSON file
      loadProfileInfo(data.profile);
    })
    .catch((error) => console.error("Error loading video info:", error));
}

function loadYouTubeVideo(youtubeLink) {
  // Concatenate the base YouTube embed URL with the provided video ID
  const fullEmbedUrl = `https://www.youtube.com/embed/${youtubeLink}`;

  // Embed YouTube video
  const videoContainer = document.querySelector("#film-link");
  videoContainer.innerHTML = `<iframe width="851" height="479" src="${fullEmbedUrl}" frameborder="0" allowfullscreen></iframe>`;
}

function loadProfileInfo(profile) {
  fetchJsonFile(`../profiles/${profile}-profile.json`)
    .then((data) => {
      // Update HTML with JSON data
      document.querySelector("#profile-link").href = data.profileLink;
      document.querySelector("#watch-avatar").src = data.avatarSrc;
      document.querySelector("#watch-username").innerText = data.username;
    })
    .catch((error) => console.error("Error fetching JSON:", error));
}

document.addEventListener("DOMContentLoaded", loadVideoInfo);
