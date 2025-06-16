import express from "express"; // Import Express framework
import axios from "axios"; // Import Axios for HTTP requests
import bodyParser from "body-parser"; // Import body-parser to parse form data

const app = express(); // Create an Express app instance
const port = 3000; // Define the port number

// Middleware to parse URL-encoded bodies (form submissions)
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware to serve static files from the "public" directory
app.use(express.static("public"));

// Your OpenWeather API key
const yourOpenWeatherApiKey = "YOUR_API_KEY_HERE";
let isSearchUsed = null; // Track if the search form was used

// Handle GET requests to the root URL ("/")
app.get("/", async (req, res) => {
  try {
    isSearchUsed = false; // Set flag for default city
    const defaultCity = "Budapest"; // Default city to show on first load

    // Get latitude and longitude for the default city using OpenWeather Geocoding API
    const resultCity = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${defaultCity}&appid=${yourOpenWeatherApiKey}`);
    const responseCity = resultCity.data;
    const lat = responseCity[0].lat;
    const lon = responseCity[0].lon; 

    // Get weather data for the city using OpenWeather One Call API
    const resultWeather = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${yourOpenWeatherApiKey}`);
    const responseWeather = resultWeather.data;

    // Prepare current weather data for the template
    const currentForecast = {
      temp: Math.round(responseWeather.current.temp),
      feel: Math.round(responseWeather.current.feels_like),
      wind: responseWeather.current.wind_speed,
      humidity: responseWeather.current.humidity,
      sunrise: responseWeather.current.sunrise,
      sunset: responseWeather.current.sunset,
      uv: responseWeather.current.uvi,
      weatherMain: responseWeather.current.weather[0].main
    }

    // Convert sunrise and sunset timestamps to readable time
    const dateSunrise = new Date(currentForecast.sunrise * 1000);
    const dateSunset = new Date(currentForecast.sunset * 1000);
    const sunrise = dateSunrise.toLocaleString();
    const sunset = dateSunset.toLocaleString();
    const normalSunrise = sunrise.slice(11); // Extract time part
    const normalSunset = sunset.slice(11);   // Extract time part

    // Get current day, month, and weekday
    const now = new Date();
    const dayOfWeek = now.toLocaleString('en-US', { weekday: 'long' });
    const month = now.toLocaleString('en-US', { month: 'long' });
    const day = now.getDate();

    // Render the EJS template with weather and date data
    res.render("index.ejs", {defaultCity ,currentForecast, normalSunrise, normalSunset, dayOfWeek, month, day, isSearchUsed});
  } catch (error) {
    // Log error details and send 500 status
    console.log(error.response.data);
    res.status(500);
  }
})

// Handle POST requests from the city search form
app.post("/city", async (req, res) => {
  try {
    isSearchUsed = true; // Set flag for search usage
    const city = req.body.city; // Get city name from form input

    // Get latitude and longitude for the searched city
    const resultCity = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${yourOpenWeatherApiKey}`);
    const responseCity = resultCity.data;
    const lat = responseCity[0].lat;
    const lon = responseCity[0].lon; 

    // Get weather data for the searched city
    const resultWeather = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${yourOpenWeatherApiKey}`);
    const responseWeather = resultWeather.data;

    // Prepare current weather data for the template
    const currentForecast = {
      temp: Math.round(responseWeather.current.temp),
      feel: Math.round(responseWeather.current.feels_like),
      wind: responseWeather.current.wind_speed,
      humidity: responseWeather.current.humidity,
      sunrise: responseWeather.current.sunrise,
      sunset: responseWeather.current.sunset,
      uv: responseWeather.current.uvi,
      weatherMain: responseWeather.current.weather[0].main
    }

    // Convert sunrise and sunset timestamps to readable time
    const dateSunrise = new Date(currentForecast.sunrise * 1000);
    const dateSunset = new Date(currentForecast.sunset * 1000);
    const sunrise = dateSunrise.toLocaleString();
    const sunset = dateSunset.toLocaleString();
    const normalSunrise = sunrise.slice(11); // Extract time part
    const normalSunset = sunset.slice(11);   // Extract time part

    // Get current day, month, and weekday
    const now = new Date();
    const dayOfWeek = now.toLocaleString('en-US', { weekday: 'long' });
    const month = now.toLocaleString('en-US', { month: 'long' });
    const day = now.getDate();

    // Render the EJS template with weather and date data for the searched city
    res.render("index.ejs", {city ,currentForecast, normalSunrise, normalSunset, dayOfWeek, month, day, isSearchUsed});
  } catch (error) {
    // Log error details and send 500 status
    console.log(error.response.data);
    res.status(500);
  }
})

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});