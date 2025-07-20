import axios from "axios";
import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;


  // !Get Weather Funcion , which fetches the function using open weather api
const getWeather = async () => {
  if (!city) return;

  setError("");
  setWeather(null);

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!res.ok) {
      const data = await res.json();
      setError(`Error: ${data.message}`);
      return;
    }
    const data = await res.json();
    setWeather(data);
  } catch (err: any) {
    setError("Request error: " + (err?.message || "Unknown error"));
  }
};

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        darkMode ? "bg-black" : "bg-gray-100"
      }`}
    >
      <div
        className={`w-full max-w-md rounded-xl shadow-lg p-6 transition-colors duration-300 ${
          darkMode ? "bg-neutral-900" : "bg-white"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2
            className={`text-2xl font-semibold text-center tracking-wide flex-1 ${
              darkMode ? "text-neutral-100" : "text-gray-900"
            }`}
          >
            Weather App
          </h2>
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className={`ml-4 px-3 py-1 rounded transition-colors duration-200 border ${
              darkMode
                ? "bg-neutral-800 text-neutral-200 border-neutral-700 hover:bg-neutral-700"
                : "bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300"
            }`}
            aria-label="Toggle theme"
          >
            {darkMode ? "🌙" : "☀️"}
          </button>
        </div>

        <div className="flex mb-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className={`flex-1 px-4 py-2 rounded-l-md focus:outline-none transition-colors duration-200 ${
              darkMode
                ? "bg-neutral-800 text-neutral-100 placeholder-neutral-500"
                : "bg-gray-100 text-gray-900 placeholder-gray-400"
            }`}
          />

          <button
            onClick={getWeather}
            className={`px-4 py-2 rounded-r-md font-medium transition-colors duration-200 ${
              darkMode
                ? "bg-neutral-700 text-neutral-200 hover:bg-neutral-600"
                : "bg-gray-300 text-gray-800 hover:bg-gray-400"
            }`}
          >
            Get
          </button>
        </div>
        {error && (
          <div
            className={`text-center text-sm mb-4 ${
              darkMode ? "text-neutral-400" : "text-gray-500"
            }`}
          >
            {error}
          </div>
        )}

        {weather && (
          <div
            className={`rounded-lg p-5 mt-4 text-center shadow transition-colors duration-200 ${
              darkMode ? "bg-neutral-800" : "bg-gray-100"
            }`}
          >
            <h3
              className={`text-lg font-medium mb-2 ${
                darkMode ? "text-neutral-100" : "text-gray-900"
              }`}
            >
              {weather.name}, {weather.sys.country}
            </h3>
            <div
              className={`text-2xl font-bold mb-1 ${
                darkMode ? "text-neutral-100" : "text-gray-900"
              }`}
            >
              {weather.main.temp}°C
            </div>
            <div
              className={`capitalize mb-1 ${
                darkMode ? "text-neutral-300" : "text-gray-700"
              }`}
            >
              {weather.weather[0].description}
            </div>
            <div
              className={`text-sm mb-1 ${
                darkMode ? "text-neutral-400" : "text-gray-500"
              }`}
            >
              Humidity: {weather.main.humidity}%
            </div>
            <div
              className={`text-sm ${
                darkMode ? "text-neutral-400" : "text-gray-500"
              }`}
            >
              Wind: {weather.wind.speed} m/s
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;