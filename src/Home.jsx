
import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "42697110f9d429f6c26bf53cefcb0a1b"; // Your OpenWeather API key

  // Function to get latitude and longitude from city name
  const getCoordinates = async (cityName) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
      );
      return {
        lat: response.data.coord.lat,
        lon: response.data.coord.lon,
      };
    } catch (error) {
      setError("City not found!");
      return null;
    }
  };

  // Function to fetch weather data using latitude and longitude
  const getWeatherData = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      setError("Error fetching weather data");
    }
  };

  const handleSearch = async () => {
    if (!city) return;
    setError(""); // Clear any previous errors
    const coords = await getCoordinates(city);
    if (coords) {
      await getWeatherData(coords.lat, coords.lon);
    }
  };

  return (
    <>
      <div className="container">
        <div className="weather">
          <div className="search">
            <input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={handleSearch}>
              <img src="./searchImg.png" alt="searchImg" />
            </button>
          </div>

          {error && <p>{error}</p>}

          {weatherData && weatherData.main && weatherData.wind ? (
            <div className="weatherInfo">
              <img src="./cloudImg.png" alt="cloud" />
              <h2>{weatherData.main.temp}°C</h2>
              <h2>{weatherData.name}</h2>
              <div className="details">
                <div className="col">
                  <img src="./humidityIcon.png" alt="humidity" />
                  <div>
                    <p>{weatherData.main.humidity}%</p>
                    <p>Humidity</p>
                  </div>
                </div>
                <div className="col">
                  <img src="./windIcon.png" alt="wind" />
                  <div>
                    <p>{weatherData.wind.speed} km/h</p>
                    <p>Wind Speed</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>Enter a city to get the weather details.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
