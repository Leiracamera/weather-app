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

    // Initialize an empty string to store HTML
    let weatherHtml = '';

    // Loop through forecast periods (limit to the next 5 days)
    for (let i = 0; i < periods.length; i += 2) {
      const dayPeriod = periods[i];   // Daytime period (high temperature)
      const nightPeriod = periods[i + 1]; // Nighttime period (low temperature)

      const maxTempF = dayPeriod.temperature; // Max (daytime) temperature in Fahrenheit
      const maxTempC = ((maxTempF - 32) / 1.8).toFixed(1); // Convert max to Celsius

      const minTempF = nightPeriod.temperature; // Min (nighttime) temperature in Fahrenheit
      const minTempC = ((minTempF - 32) / 1.8).toFixed(1); // Convert min to Celsius

      const dateTime = dayPeriod.startTime; // Date and time for the day
      const description = dayPeriod.shortForecast; // Weather description for the day

      // Format the date to display the day of the week
      const date = new Date(dateTime);
      const options = { weekday: 'long' }; // Display the day (e.g., "Monday")
      const dayOfWeek = date.toLocaleDateString(undefined, options);

      // Add the weather details for each period to the HTML string
      weatherHtml += `
        <div class="forecast-period">
          <p><strong>${dayOfWeek}</strong></p>
          <p>Max: ${maxTempF}°F (${maxTempC}°C), Min: ${minTempF}°F (${minTempC}°C)</p>
          <p>${description}</p>
        </div>
      `;
    }

    // Insert the generated HTML into the #weather div
    document.getElementById('weather').innerHTML = weatherHtml;
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

