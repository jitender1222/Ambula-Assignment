import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Weather = () => {
  const [query, setQuery] = useState("");
  const [weatherData, setWeatherData] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=dc84d3c94e456eb239d20ea9b50ab65f
        `
      );
      setWeatherData([response.data]);
    } catch (error) {
      toast("Failed to fetch weather data", { appearance: "error" });
    }

    setQuery("");
  };

  const clearResults = () => {
    setWeatherData([]);
  };

  return (
    <>
      <Toaster />
      <div className="bg-blue-200 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Weather Information</h2>
        <div className="bg-white p-6 rounded-md shadow-md">
          <form onSubmit={handleSearch} className="flex items-center mb-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter location"
              className="border border-gray-300 rounded-md p-2 mr-2"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Search
            </button>
            <button
              type="button"
              onClick={clearResults}
              className="bg-red-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-red-600 focus:outline-none focus:bg-red-600"
            >
              Clear
            </button>
          </form>

          {weatherData.length > 0 ? (
            <div>
              {weatherData.map((data) => (
                <div key={data.id} className="bg-gray-100 rounded-md p-4 mb-4">
                  <p className="text-lg font-semibold mb-2">
                    Location: {data.name}, {data.sys.country}
                  </p>
                  <p className="text-lg">
                    Temperature: {Math.round(data.main.temp - 273.15)}°C (Min:{" "}
                    {Math.round(data.main.temp_min - 273.15)}°C, Max:{" "}
                    {Math.round(data.main.temp_max - 273.15)}°C)
                  </p>
                  <p className="text-lg">Wind Speed: {data.wind.speed} m/s</p>
                  <p className="text-lg">
                    Description: {data.weather[0].description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>No weather data available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Weather;
