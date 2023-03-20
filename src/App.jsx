import React, { useEffect, useState, useContext } from "react";
import dayjs from "dayjs";
import "./lib/dayjs";

import bgDay from "./assets/bgDay.png";
import bgAfternoon from "./assets/bgAfternoon.png";

import { WeatherContext } from "./context/WeatherContext";
import { AirContext } from "./context/AirContext";

import WeekWeather from "./components/WeekWeather";
import SunChart from "./components/SunChart";
import AirQuality from "./components/AirQuality";
import TodayWeather from "./components/TodayWeather";

function App() {

  const { weather, setWeather, latitude, longitude } = useContext(WeatherContext);
  const { air, setAir } = useContext(AirContext);

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

  return (
    <div className="App">
      {!weather ? (
        <p>carregando</p>
      ) : (
        <main className="fundo" style={{ background: themeDay() }}>
          
          <TodayWeather weather={weather} hoursAndMinutes={hoursAndMinutes} latitude={latitude} longitude={longitude} />

          {!air ? (
            <p>Carregando</p>
          ) : (
            <AirQuality air={air} hoursAndMinutes={hoursAndMinutes} />
          )}

          <SunChart weather={weather} hoursAndMinutes={hoursAndMinutes} />

          <WeekWeather weather={weather} hoursAndMinutes={hoursAndMinutes} />
        </main>
      )}
    </div>
  );
}

export default App;
