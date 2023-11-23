export async function fetchHtmlFile(file) {
    try {
        const response = await fetch(file);
        return await response.text();
    } catch (error) {
        console.error('Error fetching page data:', error);
        return null;
    }
}

export async function fetchJsonFile(file) {
    try {
        const response = await fetch(file);
        return await response.json();
    } catch (error) {
        console.error('Error fetching page data:', error);
        return null;
    }
}
