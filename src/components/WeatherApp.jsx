import React, { useState, useEffect } from 'react';
import searchIcon from '../assets/images/search.png';
import clearIcon from '../assets/images/clear.png';
import cloudIcon from '../assets/images/cloud.png';
import drizzleIcon from '../assets/images/drizzle.png';
import humidityIcon from '../assets/images/humidity.png';
import rainIcon from '../assets/images/rain.png';
import snowIcon from '../assets/images/snow.png';
import windIcon from '../assets/images/wind.png';

const WeatherApp = () => {
    const apiKey = 'd9975b911c1854c9de83ca946bad82e4';
    const [wIcon, setWIcon] = useState(cloudIcon);
    const [weatherData, setWeatherData] = useState({
        humidity: '',
        windSpeed: '',
        temperature: '',
        location: '',
    });

    const fetchData = async (city) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);
        const data = await response.json();

        setWeatherData({
            humidity: `${data.main.humidity}%`,
            windSpeed: `${data.wind.speed} km/hr`,
            temperature: `${data.main.temp} °C`,
            location: data.name,
        });

        setWIcon(mapWeatherIcon(data.weather[0].icon));
    };

    const mapWeatherIcon = (iconCode) => {
        switch (iconCode) {
            case '01d':
            case '01n':
                return clearIcon;
            case '02d':
            case '02n':
            case '03d':
            case '03n':
            case '04d':
            case '04n':
                return cloudIcon;
            case '09d':
            case '09n':
            case '10d':
            case '10n':
                return rainIcon;
            case '13d':
            case '13n':
                return snowIcon;
            default:
                return clearIcon;
        }
    };

    useEffect(() => {
        // Fetch initial data when the component mounts
        fetchData('Nagpur');
    }, []);

    const search = () => {
        const element = document.getElementsByClassName('cityInput');
        if (element[0].value === '') {
            return 0;
        }
        fetchData(element[0].value);
    };

    return (
        <>
            <div className='container'>
                <div className='top-bar'>
                    <input type='text' className='cityInput' placeholder='Search' />
                    <div className='search'>
                        <img src={searchIcon} alt='Search' onClick={search} />
                    </div>
                </div>
                <div className='weather'>
                    <img src={wIcon} alt='Weather Image' />
                </div>
                <div className='temperature'>{weatherData.temperature}</div>
                <div className='location'>{weatherData.location}</div>
                <div className='data-container'>
                    <div className='element'>
                        <img src={humidityIcon} className='icon' />
                        <div className='data'>
                            <div className='humidity-percentage'>{weatherData.humidity}</div>
                            <div className='text'>Humidity</div>
                        </div>
                    </div>
                    <div className='element'>
                        <img src={windIcon} className='icon' />
                        <div className='data'>
                            <div className='wind-rate'>{weatherData.windSpeed}</div>
                            <div className='text'>Wind Speed</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WeatherApp;
