import { config } from './config.js';

// --- Requirement 1: Geospatial Intelligence ---
let map;

/**
 * @param {number} lat - Latitude coordinate.
 * @param {number} lng - Longitude coordinate.
 * @returns {void} - Nothing.
 * @description Initializes the Leaflet map at the given coordinates.
 */
function initMap(lat = 18.2682, lng = -78.3446) { // Default: Negril
    map = L.map('map-container').setView([lat, lng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);
}

/**
 * @param {string} address - The location string typed by the user.
 * @returns {Promise<void>} - Resolves when the map is updated.
 * @description Fetches coordinates using OpenStreetMap (Nominatim) and flies the Leaflet map.
 */
async function geocodeAndFly(address) {
    try {
        // Hit the free Nominatim endpoint instead of MapQuest
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
        const data = await response.json();
        
        if (data && data.length > 0) {
            // Nominatim returns latitude and longitude as 'lat' and 'lon'
            const lat = data[0].lat;
            const lng = data[0].lon; 
            
            // Fly to coordinate and drop Leaflet marker
            map.flyTo([lat, lng], 14);
            L.marker([lat, lng]).addTo(map)
                .bindPopup(`<b>${address}</b>`).openPopup();
        } else {
            alert("Location not found. Try a different search term.");
        }
            
    } catch (error) {
        console.error("Geocoding failed:", error);
    }
}

// --- Requirement 2: Real-Time News Stream ---

/**
 * @param {string} query - The search term for NYT articles.
 * @returns {Promise<void>} - Resolves when the DOM grid is updated with news.
 * @description Fetches articles from NYTimes API, controls loading spinner, and injects HTML cards.
 */
async function fetchNews(query) {
    const spinner = document.getElementById('loading-spinner');
    const grid = document.getElementById('news-grid');
    
    // Show spinner, clear grid
    spinner.classList.remove('hidden');
    grid.innerHTML = '';

    try {
        const response = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${config.NYT_KEY}`);
        const data = await response.json();
        const articles = data.response.docs.slice(0, 6); // Get top 6

        let html = '';
        articles.forEach(article => {
            const headline = article.headline.main;
            const lead = article.lead_paragraph || "No summary available.";
            const url = article.web_url;

            html += `
                <div class="news-card">
                    <h3>${headline}</h3>
                    <p>${lead}</p>
                    <a href="${url}" target="_blank">Read More</a>
                </div>
            `;
        });
        
        // Update DOM
        grid.innerHTML = html;
        
    } catch (error) {
        grid.innerHTML = '<p>Failed to load news.</p>';
        console.error("NYT API Error:", error);
    } finally {
        // Hide spinner once DOM is updated
        spinner.classList.add('hidden');
    }
}

// --- Requirement 3: On-Demand Media Player ---

/**
 * @param {string} query - The search term for YouTube videos.
 * @returns {Promise<void>} - Resolves when thumbnails and iframe are updated.
 * @description Fetches top 5 videos from YouTube API and uses Template Literals to inject UI.
 */
async function fetchVideos(query) {
    const container = document.getElementById('thumbnail-container');
    const iframe = document.getElementById('main-iframe');
    container.innerHTML = '';

    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${encodeURIComponent(query)}&type=video&key=${config.YOUTUBE_KEY}`);
        const data = await response.json();
        const videos = data.items;

        if (videos.length > 0) {
            // Set first video in iframe
            iframe.src = `https://www.youtube.com/embed/${videos[0].id.videoId}`;

            // Inject thumbnails using Template Literals
            let htmlString = '';
            videos.forEach(video => {
                const vidId = video.id.videoId;
                const thumbUrl = video.snippet.thumbnails.medium.url;
                const title = video.snippet.title;

                htmlString += `
                    <div class="thumbnail" data-vid="${vidId}" title="${title}">
                        <img src="${thumbUrl}" alt="${title}">
                    </div>
                `;
            });
            container.innerHTML = htmlString;

            // Add click listeners to newly injected thumbnails
            document.querySelectorAll('.thumbnail').forEach(thumb => {
                thumb.addEventListener('click', (e) => {
                    const id = e.currentTarget.getAttribute('data-vid');
                    iframe.src = `https://www.youtube.com/embed/${id}`;
                });
            });
        }
    } catch (error) {
        console.error("YouTube API Error:", error);
    }
}

// --- Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    initMap();

    document.getElementById('search-location-btn').addEventListener('click', () => {
        const val = document.getElementById('location-input').value;
        if(val) geocodeAndFly(val);
    });

    document.getElementById('search-news-btn').addEventListener('click', () => {
        const val = document.getElementById('news-input').value;
        if(val) fetchNews(val);
    });

    document.getElementById('search-video-btn').addEventListener('click', () => {
        const val = document.getElementById('video-input').value;
        if(val) fetchVideos(val);
    });
});