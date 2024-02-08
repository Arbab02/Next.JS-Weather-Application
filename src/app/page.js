'use client'

import React, { useState, useEffect } from 'react';


function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const API_KEY = '6a29e7b81fe7c99654d5ca1c53898ca1';

  const getWeather = () => {
    if (!city.trim()) {
      setErrorMessage('Please enter a city name');
      return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      .then(response => {
        if (!response.ok) {
          throw new Error('City not found');
        }
        return response.json();
      })
      .then(data => {
        setWeatherData(data);
        setCity('');
        setErrorMessage('');
      })
      .catch(error => {
        setWeatherData(null);
        setErrorMessage(error.message);
      });
  };

  useEffect(() => {
    getWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-700">
      <div className="w-80 h-96 bg-white shadow-lg rounded-lg p-5">
        <div className="flex justify-between items-center mb-4">
          <input
            className="border border-gray-300 p-2 rounded-lg w-56 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter city name"
            value={city}
            onChange={e => setCity(e.target.value)}
          />
          <button
            className="px-3 py-2 ml-2 bg-blue-500 text-white rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            onClick={getWeather}
          >
            <i className="fas fa-search">Click</i>
          </button>
        </div>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        {weatherData && (
          <div>
            <h2 className="text-xl font-bold">{weatherData.name}</h2>
            <h4 className="text-lg mb-2">{weatherData.weather[0].main}</h4>
            <h4 className="text-lg mb-4">{weatherData.weather[0].description}</h4>
            <img src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="Weather Icon" />
            <h1 className="text-4xl mt-4">{weatherData.main.temp} °C</h1>
            <div className="flex justify-between mt-4">
              <div>
                <h4 className="text-lg">min</h4>
                <h4 className="text-lg">{weatherData.main.temp_min} °C</h4>
              </div>
              <div>
                <h4 className="text-lg">max</h4>
                <h4 className="text-lg">{weatherData.main.temp_max} °C</h4>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
