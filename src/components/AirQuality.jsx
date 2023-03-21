import leaf from "../assets/leaf.svg";

const AirQuality = ({air, hoursAndMinutes}) => {

	function themeBoxColor() {
		const hoursAndMinutesFormat = hoursAndMinutes.split(":");
		if (hoursAndMinutesFormat[0] >= 6 && hoursAndMinutesFormat[0] < 14)
		  return "#0099e9";
		if (hoursAndMinutesFormat[0] >= 14 && hoursAndMinutesFormat[0] < 19)
		  return "#bb9a86";
	  }

  return (
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
                  (air.hourly.us_aqi[0] < 150 && "Ruim") ||
                  ("Péssimo")} 
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
  )
}

export default AirQuality