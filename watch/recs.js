// Function to fetch JSON data from an external file
async function fetchPageData() {
    try {
        const response = await fetch('pages.json'); // Adjust the file name and path as needed
        const data = await response.json();
        return data.pages;
    } catch (error) {
        console.error('Error fetching page data:', error);
        return [];
    }
}

// Function to randomly select a specified number of items from an array
function getRandomItems(array, count) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Function to truncate the title if it exceeds a certain length
function truncateTitle(title, maxLength) {
    if (title.length <= maxLength) {
        return title;
    }

    // Find the last space or non-alphanumeric character within the allowed length
    let truncatedTitle = title.substr(0, maxLength);
    let lastSpaceIndex = truncatedTitle.lastIndexOf(' ');

    // If no space found, find the last non-alphanumeric character
    if (lastSpaceIndex === -1) {
        for (let i = maxLength; i > 0; i--) {
            if (!/\w/.test(title[i])) {
                lastSpaceIndex = i;
                break;
            }
        }
    }

    // If a space or non-alphanumeric character is found, truncate at that position
    if (lastSpaceIndex !== -1) {
        truncatedTitle = truncatedTitle.substr(0, lastSpaceIndex);
    }

    return truncatedTitle + '...';
}

// Function to generate the dynamic page list
async function generatePageList() {
    const pageListContainer = document.getElementById('watch-recs');

    // Fetch page data from external file
    const allPages = await fetchPageData();

    // Randomly select 6 pages to display
    const displayedPages = getRandomItems(allPages, 6);

    // Clear existing content
    pageListContainer.innerHTML = '';

    // Loop through the displayed pages and create elements for each
    // Loop through the displayed pages and create elements for each
    displayedPages.forEach(page => {
        const pageElement = document.createElement('div');
        pageElement.classList.add('rec-vid');

        // Create an anchor element
        const linkElement = document.createElement('a');
        linkElement.href = page.link || '#'; // Set the link destination from the JSON or default to '#'
        linkElement.style.display = 'inherit';

        // Create an image element for the thumbnail
        const thumbnailElement = document.createElement('img');
        thumbnailElement.classList.add('rec-thumb');
        thumbnailElement.src = page.thumbnail;
        thumbnailElement.alt = page.title;

        // Set width and height directly in JavaScript
        thumbnailElement.width = 160;
        thumbnailElement.height = 90;

        // Append the thumbnail to the anchor element
        linkElement.appendChild(thumbnailElement);

        // Create a list for title, author, and date
        const infoList = document.createElement('ul');

        // Create list items for title, author, and date
        const titleItem = document.createElement('li');
        const truncatedTitle = truncateTitle(page.title, 39); // Truncate title if it exceeds 40 characters
        titleItem.textContent = `${truncatedTitle}`;
        titleItem.classList.add('rec-title'); // Add 'title' class

        const authorItem = document.createElement('li');
        authorItem.textContent = `${page.author || 'Unknown'}`;
        authorItem.classList.add('rec-author'); // Add 'title' class

        const dateItem = document.createElement('li');
        dateItem.textContent = `${page.date || 'Unknown'}`;
        dateItem.classList.add('rec-date');


        // Append list items to the list
        infoList.appendChild(titleItem);
        infoList.appendChild(authorItem);
        infoList.appendChild(dateItem);

        // Append the info list to the anchor element
        linkElement.appendChild(infoList);

        // Append the anchor element to the page container
        pageElement.appendChild(linkElement);

        // Append the page container to the page list
        pageListContainer.appendChild(pageElement);
    });
}

// Call the function to generate the initial page list
generatePageList();