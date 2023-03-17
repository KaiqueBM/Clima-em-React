import "./App.css";
import api from "./axios/api";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import clouds from "./assets/clouds.svg";
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

const daysOfTheWeek = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

function App() {
  const [clima, setClima] = useState();

  useEffect(() => {
    api
      .get(
        "&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,windspeed_180m&timezone=America/Fortaleza&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max"
      )
      .then((response) => setClima(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  console.log(clima);

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
    const sunChart = Math.round((minutesFormat / sunsetInMinutes) * 100);
    return sunChart;
  }
  const now = new Date();
  const dayOfTheWeekToday = now.getDay();

  return (
    <div className="App">
      {!clima ? (
        <p>carregando</p>
      ) : (
        <main>
          <section
            className={
              (clima.daily.weathercode[0] === 0 && "temperature-now-0") ||
              (clima.daily.weathercode[0] <= 3 && "temperature-now-3") ||
              (clima.daily.weathercode[0] <= 48 && "temperature-now-48") ||
              (clima.daily.weathercode[0] <= 77 && "temperature-now-77") ||
              (clima.daily.weathercode[0] <= 99 && "temperature-now-99")
            }
          >
            <div className="location">
              <img src={pin} alt="icone de localizacao" />
              <strong>São Paulo, SP</strong>
            </div>
            <div className="temp">
              <div className="number">
                {clima.current_weather.temperature}
                <div className="maxmin">
                  {clima.daily.temperature_2m_max[0]}°{" "}
                  <span>{clima.daily.temperature_2m_min[0]}° </span>
                </div>
              </div>
              <div className="celsius">°C</div>
            </div>
            <div className="statistics">
              <div className="stats">
                <img src={tempWind} alt="icone de vento" />
                <div className="info">
                  <p>Vento</p>
                  <h5>
                    {clima.current_weather.windspeed} <span>km/h</span>
                  </h5>
                </div>
              </div>
              <div className="stats">
                <img src={tempHumidity} alt="icone de umidade" />
                <div className="info">
                  <p>Umidade</p>
                  <h5>
                    {clima.hourly.relativehumidity_2m[0]} <span>%</span>
                  </h5>
                </div>
              </div>
              <div className="stats">
                <img src={tempRain} alt="icone de chuva" />
                <div className="info">
                  <p>Chuva</p>
                  <h5>
                    {clima.daily.precipitation_probability_max[0]}{" "}
                    <span>%</span>
                  </h5>
                </div>
              </div>
            </div>
          </section>

          <section className="air-quality">
            <h2 className="title">
              <img src={leaf} alt="icone de folha de árvore" />
              Qualidade do ar
            </h2>

            <p className="good">Boa</p>
            <p className="number">21</p>

            <div className="info">
              <div className="number">
                <p>12.9</p>
                <small>PM2.5</small>
              </div>
              <div className="number">
                <p>12.9</p>
                <small>PM10</small>
              </div>
              <div className="number">
                <p>2.1</p>
                <small>SO₂</small>
              </div>
              <div className="number">
                <p>1.4</p>
                <small>NO₂</small>
              </div>
              <div className="number">
                <p>21.2</p>
                <small>O₃</small>
              </div>
              <div className="number">
                <p>0.7</p>
                <small>CO</small>
              </div>
            </div>
          </section>

          <section className="sun-time">
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
              <time className="sunrise">{setSunrise(clima.daily.sunrise)}</time>
              <time className="sunset">{setSunset(clima.daily.sunset)}</time>
            </div>
          </section>

          <section className="week-weather">
            <div className="day">
              <h4 className="title">Amanhã</h4>
              <img
                src={
                  (clima.daily.weathercode[1] === 0 && { weatherSun }) ||
                  (clima.daily.weathercode[1] <= 3 && weatherCloudy) ||
                  (clima.daily.weathercode[1] <= 48 && weatherClouds) ||
                  (clima.daily.weathercode[1] <= 77 && weatherRain) ||
                  (clima.daily.weathercode[1] <= 99 && weatherThunder)
                }
                alt=""
              />
              <p className="maxmin">
                {clima.daily.temperature_2m_max[1]}°{" "}
                <span>{clima.daily.temperature_2m_min[1]}°</span>
              </p>
            </div>
            <div className="day">
              <h4 className="title">
                {dayjs(clima.daily.time[2]).format("dddd")}
              </h4>
              <img
                src={
                  (clima.daily.weathercode[2] === 0 && { weatherSun }) ||
                  (clima.daily.weathercode[2] <= 3 && weatherCloudy) ||
                  (clima.daily.weathercode[2] <= 48 && weatherClouds) ||
                  (clima.daily.weathercode[2] <= 77 && weatherRain) ||
                  (clima.daily.weathercode[2] <= 99 && weatherThunder)
                }
                alt=""
              />
              <p className="maxmin">
                {clima.daily.temperature_2m_max[2]}°{" "}
                <span>{clima.daily.temperature_2m_min[2]}°</span>
              </p>
            </div>
            <div className="day">
              <h4 className="title">
                {dayjs(clima.daily.time[3]).format("dddd")}
              </h4>
              <img
                src={
                  (clima.daily.weathercode[3] === 0 && { weatherSun }) ||
                  (clima.daily.weathercode[3] <= 3 && weatherCloudy) ||
                  (clima.daily.weathercode[3] <= 48 && weatherClouds) ||
                  (clima.daily.weathercode[3] <= 77 && weatherRain) ||
                  (clima.daily.weathercode[3] <= 99 && weatherThunder)
                }
                alt=""
              />
              <p className="maxmin">
                {clima.daily.temperature_2m_max[3]}°{" "}
                <span>{clima.daily.temperature_2m_min[3]}°</span>
              </p>
            </div>
            <div className="day">
              <h4 className="title">
                {dayjs(clima.daily.time[4]).format("dddd")}
              </h4>
              <img
                src={
                  (clima.daily.weathercode[4] === 0 && { weatherSun }) ||
                  (clima.daily.weathercode[4] <= 3 && weatherCloudy) ||
                  (clima.daily.weathercode[4] <= 48 && weatherClouds) ||
                  (clima.daily.weathercode[4] <= 77 && weatherRain) ||
                  (clima.daily.weathercode[4] <= 99 && weatherThunder)
                }
                alt=""
              />
              <p className="maxmin">
                {clima.daily.temperature_2m_max[4]}°{" "}
                <span>{clima.daily.temperature_2m_min[4]}°</span>
              </p>
            </div>
            <div className="day">
              <h4 className="title">
                {dayjs(clima.daily.time[5]).format("dddd")}
              </h4>
              <img
                src={
                  (clima.daily.weathercode[5] === 0 && { weatherSun }) ||
                  (clima.daily.weathercode[5] <= 3 && weatherCloudy) ||
                  (clima.daily.weathercode[5] <= 48 && weatherClouds) ||
                  (clima.daily.weathercode[5] <= 77 && weatherRain) ||
                  (clima.daily.weathercode[5] <= 99 && weatherThunder)
                }
                alt=""
              />
              <p className="maxmin">
                {clima.daily.temperature_2m_max[5]}°{" "}
                <span>{clima.daily.temperature_2m_min[5]}°</span>
              </p>
            </div>
          </section>
        </main>
      )}
    </div>
  );
}

export default App;
