import React from 'react'
import sunChart from "../assets/sun-chart.svg";
import sunTime from "../assets/sun-time.svg";

const SunChart = ({weather, hoursAndMinutes}) => {

	function setSunrise(sunrise) {
		const sunriseHour = sunrise[0].split("T");
		return sunriseHour[1];
	  }
	
	  function setSunset(sunset) {
		const sunsetHour = sunset[0].split("T");
		return sunsetHour[1];
	  }

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

	function themeBoxColor() {
		const hoursAndMinutesFormat = hoursAndMinutes.split(":");
		if (hoursAndMinutesFormat[0] >= 6 && hoursAndMinutesFormat[0] < 14)
		  return "#0099e9";
		if (hoursAndMinutesFormat[0] >= 14 && hoursAndMinutesFormat[0] < 19)
		  return "#bb9a86";
	  }

  return (
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
  )
}

export default SunChart