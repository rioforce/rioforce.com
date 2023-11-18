document.addEventListener("DOMContentLoaded", function () {
    // Load video information from external JSON file
    loadVideoInfo();

    // Load and display the video
    loadYouTubeVideo();
});

function loadVideoInfo() {
    // Load data from an external JSON file (e.g., videoinfo.json)
    fetch('videoinfo.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('pageTitle').innerText = data.title;
            document.getElementById('video-title').innerText = data.title;
            document.getElementById('video-date').innerText = data.date;
            fetch(data.description)
                .then(response => response.blob())
                .then(blob => blob.text())
                .then(markdown => {
                    document.getElementById("video-description").innerHTML = marked.parse(markdown);
                });

            loadYouTubeVideo(data.youtubeLink);
        })
        .catch(error => console.error('Error loading video info:', error));
}

function loadYouTubeVideo(youtubeLink) {
    // Embed YouTube video
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = `
        <iframe width="560" height="315" src="${youtubeLink}" frameborder="0" allowfullscreen></iframe>
    `;
}
