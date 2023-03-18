
import weatherClouds from "../assets/weather-clouds.svg";
import weatherCloudy from "../assets/weather-cloudy.svg";
import weatherRain from "../assets/weather-rain.svg";
import weatherSun from "../assets/weather-sun.svg";
import weatherThunder from "../assets/weather-thunder.svg";

import dayjs from "dayjs";
import "../lib/dayjs";

const arrayNumbers = [1,2,3,4,5]

const WeekWeather = ({weather, hoursAndMinutes}) => {

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
  )
}

export default WeekWeather