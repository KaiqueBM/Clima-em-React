import "./App.css";
import api from "./axios/api";
import apiAir from "./axios/apiAir";

import React, { useEffect, useState, useContext } from "react";
import dayjs from "dayjs";
import "./lib/dayjs";

import leaf from "./assets/leaf.svg";
import pin from "./assets/pin.svg";
import sunChart from "./assets/sun-chart.svg";
import sunTime from "./assets/sun-time.svg";
import tempHumidity from "./assets/temp-humidity.svg";
import tempRain from "./assets/temp-rain.svg";
import tempWind from "./assets/temp-wind.svg";
import weatherClouds from "./assets/weather-clouds.svg";
import weatherCloudy from "./assets/weather-cloudy.svg";
import weatherRain from "./assets/weather-rain.svg";
import weatherSun from "./assets/weather-sun.svg";
import weatherThunder from "./assets/weather-thunder.svg";

import bgDay from "./assets/bgDay.png";
import bgAfternoon from "./assets/bgAfternoon.png";
import bgNight from "./assets/bgNight.png";
import bgTempDay from "./assets/bgTempDay.png";
import bgTempAfternoon from "./assets/bgTempAfternoon.png";
import bgTempNight from "./assets/bgTempNight.png";


import { WeatherContext } from "./context/WeatherContext";
import { AirContext } from "./context/AirContext";

const arrayNumbers = [1,2,3,4,5]


function App() {

  const { weather, setWeather } = useContext(WeatherContext);
  const { air, setAir } = useContext(AirContext);

  function setSunrise(sunrise) {
    const sunriseHour = sunrise[0].split("T");
    return sunriseHour[1];
  }

  function setSunset(sunset) {
    const sunsetHour = sunset[0].split("T");
    return sunsetHour[1];
  }

  const [hoursAndMinutes, setHoursAndMinutes] = useState(
    new Date().toLocaleString()
  );

  useEffect(() => {
    let secTimer = setInterval(() => {
      const now = new Date();
      setHoursAndMinutes(
        dayjs()
          .set("hour", now.getHours())
          .set("minute", now.getMinutes())
          .format("HH:mm")
      );
    }, 1000);

    return () => clearInterval(secTimer);
  }, []);

  function sunChartPosition() {
    const hoursAndMinutesFormat = hoursAndMinutes.split(":");
    let minutesFormat =
      (hoursAndMinutesFormat[0] + hoursAndMinutesFormat[1]) * 60;
    const sunriseInMinutes = 600 * 60;
    let sunsetInMinutes = 1825 * 60;
    minutesFormat -= sunriseInMinutes;
    sunsetInMinutes -= sunriseInMinutes;
    let sunChart = Math.round((minutesFormat / sunsetInMinutes) * 100);
    if(sunChart > 100){
      sunChart = 100
    }
    return sunChart;
  }

  function themeDay() {
    const hoursAndMinutesFormat = hoursAndMinutes.split(":");
    if (hoursAndMinutesFormat[0] >= 6 && hoursAndMinutesFormat[0] < 14) {
      const urlBg = `url(${bgAfternoon}) no-repeat center/cover`;
      return urlBg;
    }
    if (hoursAndMinutesFormat[0] >= 14 && hoursAndMinutesFormat[0] < 19) {
      const urlBg = `url(${bgDay}) no-repeat center/cover`;
      return urlBg;
    }
  }

  function themeBoxDay() {
    const hoursAndMinutesFormat = hoursAndMinutes.split(":");
    if (hoursAndMinutesFormat[0] >= 6 && hoursAndMinutesFormat[0] < 14) {
      const urlBg = `url(${bgTempAfternoon}) no-repeat center/cover`;
      return urlBg;
    }
    if (hoursAndMinutesFormat[0] >= 14 && hoursAndMinutesFormat[0] < 19) {
      const urlBg = `url(${bgTempDay}) no-repeat center/cover`;
      return urlBg;
    }
  }

  function themeBoxColor() {
    const hoursAndMinutesFormat = hoursAndMinutes.split(":");
    if (hoursAndMinutesFormat[0] >= 6 && hoursAndMinutesFormat[0] < 14)
      return "#0099e9";
    if (hoursAndMinutesFormat[0] >= 14 && hoursAndMinutesFormat[0] < 19)
      return "#bb9a86";
  }

  function weekFormat(day) {
    const dayFormat = day.split("-");
    return dayFormat[0];
  }

  return (
    <div className="App">
      {!weather ? (
        <p>carregando</p>
      ) : (
        <main className="fundo" style={{ background: themeDay() }}>
          <section
            className={
              (weather.daily.weathercode[0] === 0 &&
                "temperature-now-0 fundo-box-temp") ||
              (weather.daily.weathercode[0] <= 3 &&
                "temperature-now-3 fundo-box-temp") ||
              (weather.daily.weathercode[0] <= 48 &&
                "temperature-now-48 fundo-box-temp") ||
              (weather.daily.weathercode[0] <= 77 &&
                "temperature-now-77 fundo-box-temp") ||
              (weather.daily.weathercode[0] <= 99 &&
                "temperature-now-99 fundo-box-temp")
            }
            style={{ background: themeBoxDay() }}
          >
            <div className="location">
              <img src={pin} alt="icone de localizacao" />
              <strong>São Paulo, SP</strong>
            </div>
            <div className="temp">
              <div className="number">
                {weather.current_weather.temperature}
                <div className="maxmin">
                  {weather.daily.temperature_2m_max[0]}°{" "}
                  <span>{weather.daily.temperature_2m_min[0]}° </span>
                </div>
              </div>
              <div className="celsius">°C</div>
            </div>
            <div className="statistics">
              <div className="stats" style={{ background: themeBoxColor() }}>
                <img src={tempWind} alt="icone de vento" />
                <div className="info">
                  <p>Vento</p>
                  <h5>
                    {weather.current_weather.windspeed} <span>km/h</span>
                  </h5>
                </div>
              </div>
              <div className="stats" style={{ background: themeBoxColor() }}>
                <img src={tempHumidity} alt="icone de umidade" />
                <div className="info">
                  <p>Umidade</p>
                  <h5>
                    {weather.hourly.relativehumidity_2m[0]} <span>%</span>
                  </h5>
                </div>
              </div>
              <div className="stats" style={{ background: themeBoxColor() }}>
                <img src={tempRain} alt="icone de chuva" />
                <div className="info">
                  <p>Chuva</p>
                  <h5>
                    {weather.daily.precipitation_probability_max[0]}{" "}
                    <span>%</span>
                  </h5>
                </div>
              </div>
            </div>
          </section>

          {!air ? (
            <p>Carregando</p>
          ) : (
            <section
              className="fundo-box air-quality"
              style={{ background: themeBoxColor() }}
            >
              <h2 className="title">
                <img src={leaf} alt="icone de folha de árvore" />
                Qualidade do ar
              </h2>

              <p className="good">
                {(air.hourly.us_aqi[0] <= 50 && "Boa") ||
                  (air.hourly.us_aqi[0] < 100 && "Moderado") ||
                  (air.hourly.us_aqi[0] < 150 && "Ruim")}
              </p>
              <p className="number">{air.hourly.us_aqi[0]}</p>

              <div className="info">
                <div className="number">
                  <p>{air.hourly.pm2_5[0]}</p>
                  <small>PM2.5</small>
                </div>
                <div className="number">
                  <p>{air.hourly.pm10[0]}</p>
                  <small>PM10</small>
                </div>
                <div className="number">
                  <p>{air.hourly.sulphur_dioxide[0]}</p>
                  <small>SO₂</small>
                </div>
                <div className="number">
                  <p>{air.hourly.nitrogen_dioxide[0]}</p>
                  <small>NO₂</small>
                </div>
                <div className="number">
                  <p>{air.hourly.ozone[0]}</p>
                  <small>O₃</small>
                </div>
                <div className="number">
                  <p>{air.hourly.carbon_monoxide[0]}</p>
                  <small>CO</small>
                </div>
              </div>
            </section>
          )}

          <section
            className="fundo-box sun-time"
            style={{ background: themeBoxColor() }}
          >
            <h2 className="title">
              <img src={sunTime} alt="icone de um sol com um relógio dentro" />
              Horário do sol
            </h2>
            <div className="sun-chart-wrapper">
              <div
                className="sun-chart"
                style={{ "--pos-x": sunChartPosition() }}
              >
                <div className="chart">
                  <img
                    src={sunChart}
                    alt="imagem de um gráfico semi circulo com traços"
                  />
                </div>
                <time className="now">{hoursAndMinutes}</time>
              </div>
            </div>
            <div className="time">
              <time className="sunrise">{setSunrise(weather.daily.sunrise)}</time>
              <time className="sunset">{setSunset(weather.daily.sunset)}</time>
            </div>
          </section>

          <section
            className="fundo-box week-weather"
            style={{ background: themeBoxColor() }}
          >

                {arrayNumbers.map((number, index)=>(
                  <div className="day" key={index}>
              <h4 className="title">
                {weekFormat(dayjs(weather.daily.time[number]).format("dddd"))}
              </h4>
              <img
                src={
                  (weather.daily.weathercode[number] === 0 && { weatherSun }) ||
                  (weather.daily.weathercode[number] <= 3 && weatherCloudy) ||
                  (weather.daily.weathercode[number] <= 48 && weatherClouds) ||
                  (weather.daily.weathercode[number] <= 77 && weatherRain) ||
                  (weather.daily.weathercode[number] <= 99 && weatherThunder)
                }
                alt=""
              />
              <p className="maxmin">
                {weather.daily.temperature_2m_max[number]}°{" "}
                <span>{weather.daily.temperature_2m_min[number]}°</span>
              </p>
            </div>
                ))

                }

          </section>
        </main>
      )}
    </div>
  );
}

export default App;
