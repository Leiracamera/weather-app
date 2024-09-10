// app.js
console.log("Fetching weather data...");

// Latitude and longitude for Los Angeles
const lat = 34.0907;
const lon = -118.3266;

// Fetch weather data for the location
fetch(`https://api.weather.gov/points/${lat},${lon}`)
.then(response => response.json())
.then(data => {
    const forecastUrl = data.properties.forecast; // Extract the forecast URL

    // Fetch the actual forecast using the forecast URL
    return fetch(forecastUrl);
})
.then(response => response.json())
.then(forecastData => {
    const periods = forecastData.properties.periods; // Get the forecast periods
    const firstPeriod = periods[0]; // Get the first period's data (Today)

    const tempF = firstPeriod.temperature; // Temp in F
    const tempC = ((tempF - 32) / 1.8).toFixed(1); // Convert to Celsuis

    // Display both temps on the webpage
    document.getElementById('weather').innerHTML = 
    `Temperature: ${tempF}°F ✨ ${tempC}°C`;
})
.catch(error => {
    console.error('Error fetching data:', error);
});


// "https://api.weather.gov/gridpoints/LOX/152,47/forecast"