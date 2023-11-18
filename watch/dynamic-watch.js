document.addEventListener("DOMContentLoaded", function () {
    // Load video information from external JSON file
    loadVideoInfo();

    // Load video information from external JSON file
    loadProfileInfo();

    // Load and display the video
    loadYouTubeVideo();
});

function loadVideoInfo() {
    // Load data from an external JSON file (e.g., videoinfo.json)
    fetch('videoinfo.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('pageTitle').innerText = data.title;
            document.getElementById('film-title').innerText = data.title;
            document.getElementById('film-date').innerText = data.date;
            fetch(data.description)
                .then(response => response.blob())
                .then(blob => blob.text())
                .then(markdown => {
                    document.getElementById("article-description").innerHTML = marked.parse(markdown);
                });

            loadYouTubeVideo(data.youtubeLink);
        })
        .catch(error => console.error('Error loading video info:', error));
}

function loadYouTubeVideo(youtubeLink) {
    // Concatenate the base YouTube embed URL with the provided video ID
    const baseEmbedUrl = "https://www.youtube.com/embed/";
    const fullEmbedUrl = baseEmbedUrl + youtubeLink;

    // Embed YouTube video
    const videoContainer = document.getElementById('film-link');
    videoContainer.innerHTML = `
        <iframe width="1240" height="720" src="${fullEmbedUrl}" frameborder="0" allowfullscreen></iframe>
    `;
}
function loadProfileInfo() {
    fetch('profileinfo.json')
        .then(response => response.json())
        .then(data => {
            // Update HTML with JSON data
            document.getElementById('profile-link').href = data.profileLink;
            document.getElementById('watch-avatar').src = data.avatarSrc;
            document.getElementById('watch-username').innerText = data.username;
        })
        .catch(error => console.error('Error fetching JSON:', error));
}
