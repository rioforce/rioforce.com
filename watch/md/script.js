document.addEventListener('DOMContentLoaded', function () {
    // Fetch the Markdown file
    fetch('your-markdown-file.md')
        .then(response => response.text())
        .then(markdown => {
            // Ensure that marked is available globally
            const marked = window.marked;

            // Convert Markdown to HTML using the marked library
            const htmlContent = marked(markdown);

            // Set the HTML content in the specified element
            document.getElementById('markdown-content').innerHTML = htmlContent;
        })
        .catch(error => console.error('Error fetching the Markdown file:', error));
});