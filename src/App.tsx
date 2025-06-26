import axios from "axios";
import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState("");

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const getWeather = async () => {
    if (!city) return;
    setError("");
    setWeather(null);
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeather(res.data);
    } catch (err: any) {
      if (err.response) {
        setError(`Error: ${err.response.data.message}`);
      } else if (err.request) {
        setError("No response from server. Check your network.");
      } else {
        setError("Request error: " + err.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md bg-neutral-900 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-neutral-100 mb-6 tracking-wide">
          Weather App
        </h2>
        <div className="flex mb-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="flex-1 px-4 py-2 rounded-l-md bg-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none"
          />
          <button
            onClick={getWeather}
            className="px-4 py-2 rounded-r-md bg-blue-600 text-neutral-200 font-medium hover:bg-blue-900 transition"
          >
            Get
          </button>
        </div>
        {error && (
          <div className="text-neutral-400 text-center text-sm mb-4">{    }</div>
        )}
        {weather && (
          <div className="bg-neutral-800 rounded-lg p-5 mt-4 text-center shadow">
            <h3 className="text-lg font-medium text-neutral-100 mb-2">
              {weather.name}, {weather.sys.country}
            </h3>
            <div className="text-2xl font-bold text-neutral-100 mb-1">
              {weather.main.temp}°C
            </div>
            <div className="capitalize text-neutral-300 mb-1">
              {weather.weather[0].description}
            </div>
            <div className="text-neutral-400 text-sm mb-1">
              Humidity: {weather.main.humidity}%
            </div>
            <div className="text-neutral-400 text-sm">
              Wind: {weather.wind.speed} m/s
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;