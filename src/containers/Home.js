import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

import Header from "../components/Header";

const weatherKey = `e850509c477f5f1fbc05e877b50d5156`;

function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Tokyo");

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}`
      )
      .then(function (response) {
        const weather = response.data;
        setWeatherData(weather);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [city]);

  const {
    cloudiness,
    currentTemp,
    highTemp,
    humididty,
    lowTemp,
    weatherType,
    windSpeed,
  } = useMemo(() => {
    let cloudiness = "";
    let currentTemp = "";
    let highTemp = "";
    let humididty = "";
    let lowTemp = "";
    let weatherType = "";
    let windSpeed = "";

    if (weatherData) {
      cloudiness = `${weatherData.clouds.all}%`;
      currentTemp = weatherData.main.temp;
      highTemp = weatherData.main.temp_max;
      humididty = `${weatherData.main.humidity}%`;
      lowTemp = weatherData.main.temp_min;
      weatherType = weatherData.weather[0].description;
      windSpeed = `${weatherData.wind.speed} km/h`;
    }

    return {
      cloudiness,
      currentTemp,
      highTemp,
      humididty,
      lowTemp,
      weatherType,
      windSpeed,
    };
  }, [weatherData]);

  console.log("weatherData", weatherData);

  return (
    <>
      <Header />
      <main className="Home">
        <h2>Weather in {city}</h2>
        <div className="WeatherInfo">
          <p>Weather Type: {weatherType} </p>
          <p>Current Temperature: {currentTemp}</p>
          <p>High Temperature: {highTemp}</p>
          <p>Low Temperature: {lowTemp}</p>
          <p>Cloudiness: {cloudiness}</p>
          <p>Humidity: {humididty}</p>
          <p>Weind Speed: {windSpeed}</p>
        </div>
      </main>
    </>
  );
}

export default Home;
