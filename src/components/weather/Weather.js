import { useState } from 'react';
import "./Weather.scss";

/* our states*/
const Weather = () => {
    const [input, setInput] =useState("")
    const [weather, setWeather] =useState({})
    const [isLoading, setIsLoading] =useState(false)
    const [error, setError] =useState(true)
    const [errorMsg, setErrorMsg] =useState("")

    const api = {
        url: "http://api.openweathermap.org/data/2.5/", 
        key: "6b46c72ccd301300d2bef8693ba05e48",
    };
    const iconURL = "http://openweathermap.org/img/w/";

    const getInput = (e) => {
        setInput(e.target.value)
    };

    const getWeatherData = (e) => {
        if (e.key === "Enter" && input === "") {
            setErrorMsg("Input cannot be empty")
            setError(true)
        }
        if (e.key === "Enter" && input !== "") {
            fetch(`${api.url}weather?q=${input}&units=metrics&APPID=${api.key}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setWeather(data)
                setInput("")
                setError(false);
            });
        }
    };

    /*below '{error' is a ternary operator saying if error display error msg and if not, display results */
    return <section className='--100vh --center-all'>
        <div className="container weather --flex-center">
            <div className='weather-app --text-light'>
            <h1> Weather App</h1>
            <p>2022-01-18</p>
        <div className='--form-control --my2'>
            <input type="text" placeholder='Search city name' onChange={getInput} value={input} onKeyPress={getWeatherData}/>
        </div>
        {error ? (
            <p>{errorMsg}</p>
        ) : (
            <div className='result --card --my2'>
            <h2>{weather.name},{weather.sys.country}</h2>
            <div className='icon'>
                <img src={iconURL + weather.weather[0].icon + ".png"} alt={weather.weather[0].main} />
            </div>
        <p>Temp: {Math.round(weather.main.temp)}°C</p>
        <p>Weather: {weather.weather[0].main}</p>
        <p>Temp Range: {Math.round(weather.main.temp_min)}°C / {Math.round(weather.main.temp_max)}°C</p>
        </div>
        )}
        </div>
    </div>
    </section>
    };

export default Weather
