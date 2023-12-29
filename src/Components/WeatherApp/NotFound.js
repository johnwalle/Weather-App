import React from 'react';
import { useLocation } from 'react-router-dom';
import cloud from '../Assets/cloud.png';
import './WeatherApp.css'



const NotFound = () => {
  const location = useLocation();
  const inputValue = location.state;

  return (
    <div className='main_container'>
        <div className="cloud-icon" id='cloud-icon'>
        <img src={cloud} alt="cloud" />
      </div>
      <h3 className='not_found_heading'>Result not found for {inputValue}</h3>
    </div>
  );
};

export default NotFound;