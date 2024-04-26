
import React, { useEffect, useState } from 'react';
import weatherData from './weather.json'; 
import './Weathercomponent.css';

function WeatherComponent() {
  const [city, setCity] = useState('');
  const [temperatureData, setTemperatureData] = useState([]);
  const [error, setError] = useState('');

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    if (!city.trim()) {
      setError('Please enter a city name.');
      return;
    }
    const cityData = weatherData.find(item => item?.city?.name?.toLowerCase() == city.toLowerCase());
    if (!cityData) {
      setError('City not found in the weather data.');
      return;
    }

    const temperatureDetailsFor5Days = cityData.list;
    setTemperatureData(temperatureDetailsFor5Days);
    setError('');
  };

  useEffect(()=>{},[temperatureData]);

  return (
    <div className="weather-component">
      <h2 className='weatherheader'>Weather in your city</h2>
      <div>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleCityChange}
        />
        <button className='buttobg' onClick={handleSearch}>Search</button>
      </div>

      {error && <p>{error}</p>}

      <div className='wrapcomponent'>
      {temperatureData.length>0 && temperatureData.map((temperatureData, index)=>(
        <div key={temperatureData.dt} className="temperature-data-grid">
          <h2>DATE:{temperatureData.dt_txt}</h2>
          <div className="temperature-section">
            <p>Temperature</p>
            <div className='mmgrid'>
              <p>Min: {temperatureData.main.temp_min} K</p>
              <p>Max: {temperatureData.main.temp_max} K</p>
            </div>
            <p>Pressure: {temperatureData.main.pressure} hPa</p>
            <p>Humidity: {temperatureData.main.humidity}%</p>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}

export default WeatherComponent;
