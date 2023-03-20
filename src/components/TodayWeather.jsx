import tempHumidity from "../assets/temp-humidity.svg";
import tempRain from "../assets/temp-rain.svg";
import tempWind from "../assets/temp-wind.svg";
import pin from "../assets/pin.svg";

import bgTempDay from "../assets/bgTempDay.png";
import bgTempAfternoon from "../assets/bgTempAfternoon.png";

const TodayWeather = ({weather, hoursAndMinutes, latitude, longitude}) => {


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

  return (
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
              <strong>{latitude === -23.565414759900598 && ("São Paulo, SP") || (`${latitude} | ${longitude}`) }</strong>
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
  )
}

export default TodayWeather