import React, { useState, useEffect,useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import './WeatherApp.css';
import Search_icon from '../Assets/search-icon.png';
import cloud from '../Assets/cloud.png';
import humid from '../Assets/humid.png';
import wind_speed from '../Assets/wind.png';

const WeatherApp = () => {
  const [inputValue, setInputValue] = useState('');
  const [location, setLocation] = useState('London');
  const [country, setCountry] = useState('GB');
  const [temperature, setTemperature] = useState('24');
  const [windSpeed, setWindSpeed] = useState('18');
  const [humidity, setHumidity] = useState('64');
  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const API_KEY = '4d461c27391662508009ce9a8031a3b4';

  const searchWeather = async () => {
    if (inputValue === '') {
      inputRef.current.focus();
      return;
    }

    setLoading(true);

    const API_SEARCH = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&appid=${API_KEY}`;

    try {
      const response = await fetch(API_SEARCH);
      const data = await response.json();
      console.log('Fetched successfully');
      console.log(data);
       
      if (data.cod === '404') {
        navigate('/not-found', { state: inputValue });
        setLoading(false);
        return;
      }

      setLocation(data.name);
      setTemperature(data.main.temp);
      setWindSpeed(data.wind.speed);
      setHumidity(data.main.humidity);
      setCountry(data.sys.country);
      setLoading(false);

    } catch (error) {
      console.error('Error fetching weather data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    inputRef.current.focus();
    searchWeather();
  }, []);

  return (
    <div className="main_container">
      <div className="Search_container">
        <input
          onChange={changeHandler}
          value={inputValue}
          className="search_weather"
          type="text"
          placeholder="Search City"
          ref={inputRef}
        />
        <img
          onClick={searchWeather}
          className="search_icon"
          src={Search_icon}
          alt="Search icon"
        />
      </div>
      {loading ? (
        <div className="loading-message">
          <ul>
  <li style={{ animationDelay: '-1.4s', backgroundColor: '#FF0000' }}></li>
  <li style={{ animationDelay: '-1.2s', backgroundColor: '#76ff03' }}></li>
  <li style={{ animationDelay: '-1s', backgroundColor: '#f06292' }}></li>
  <li style={{ animationDelay: '-0.8s', backgroundColor: '#4fc3f7' }}></li>
  <li style={{ animationDelay: '-0.6s', backgroundColor: '#ba68c8' }}></li>
  <li style={{ animationDelay: '-0.4s', backgroundColor: '#f57c00' }}></li>
  <li style={{ animationDelay: '-0.2s', backgroundColor: '#673ab7' }}></li>
</ul>
        </div>
      ) : (
        <>
          <div className="cloud-icon">
            <img src={cloud} alt="cloud" />
          </div>
          <div className="temperature-container">
            <div className="temperature">{temperature}°C</div>
            <div className="city-name">
              {location}, {country}
            </div>
          </div>
          <div className="wind-humidity-container">
            <div className="humidity">
              <img src={humid} alt="humidity" />
              <div className="container">
                <div className="humidity-value">{humidity}%</div>
                <div className="text">Humidity</div>
              </div>
            </div>
            <div className="humidity">
              <img src={wind_speed} alt="wind-speed" />
              <div className="container">
                <div className="wind-rate">{windSpeed} km/h</div>
                <div className="text">Wind Speed</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherApp;