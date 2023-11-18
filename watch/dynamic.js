document.addEventListener("DOMContentLoaded", function () {
    // Load video information from external files
    loadVideoInfo();

    // Load and display the video
    loadYouTubeVideo();
});

function loadVideoInfo() {
    // Load title from an external file (e.g., title.txt)
    fetch('title.txt')
        .then(response => response.text())
        .then(title => {
            document.getElementById('pageTitle').innerText = title;
            document.getElementById('video-title').innerText = title;
        })
        .catch(error => console.error('Error loading title:', error));

    // Load description from an external Markdown file (e.g., description.md)
    fetch('description.md')
        .then(response => response.text())
        .then(description => {
            // Convert Markdown to HTML
            const converter = new showdown.Converter();
            const htmlDescription = converter.makeHtml(description);
            document.getElementById('video-description').innerHTML = htmlDescription;
        })
        .catch(error => console.error('Error loading description:', error));
}

function loadYouTubeVideo() {
    // Load YouTube link from an external file (e.g., youtube-link.txt)
    fetch('youtube-link.txt')
        .then(response => response.text())
        .then(youtubeLink => {
            // Embed YouTube video
            const videoContainer = document.getElementById('video-container');
            videoContainer.innerHTML = `
                <iframe width="560" height="315" src="${youtubeLink}" frameborder="0" allowfullscreen></iframe>
            `;
        })
        .catch(error => console.error('Error loading YouTube link:', error));
}
