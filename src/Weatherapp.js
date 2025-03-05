import React, { useState } from "react";
import axios from "axios";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "191479c63d1d2114cb1a53968ffdefcd";
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError("");
    try {
      const response = await axios.get(API_URL);
      setWeather(response.data);
    } catch (err) {
      setError("City not found. Try again!");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Weather Dashboard 🌦️</h2>
      <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div>
          <h3>{weather.name}, {weather.sys.country}</h3>
          <p>{weather.weather[0].description}</p>
          <p>🌡️ {weather.main.temp}°C</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
