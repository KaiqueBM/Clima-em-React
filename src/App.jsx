import "./App.css";

function App() {
  return (
    <div className="App">
      <main>
        <section className="temperature-now">
          <div className="location">
            <img src="./assets/pin.svg" alt="icone de localizacao" />
            <strong>Rio do Sul, SC</strong>
          </div>
          <div className="temp">
            <div className="number">
              18
              <div className="maxmin">
                22° <span>16° </span>
              </div>
            </div>
            <div className="celsius">°C</div>
          </div>
          <div className="statistics">
            <div className="stats">
              <img src="./assets/temp-wind.svg" alt="icone de vento" />
              <div className="info">
                <p>Vento</p>
                <h5>
                  17 <span>km/h</span>
                </h5>
              </div>
            </div>
            <div className="stats">
              <img src="./assets/temp-humidity.svg" alt="icone de umidade" />
              <div className="info">
                <p>Umidade</p>
                <h5>
                  31 <span>%</span>
                </h5>
              </div>
            </div>
            <div className="stats">
              <img src="./assets/temp-rain.svg" alt="icone de chuva" />
              <div className="info">
                <p>Chuva</p>
                <h5>
                  10 <span>%</span>
                </h5>
              </div>
            </div>
          </div>
        </section>

        <section className="air-quality">
          <h2 className="title">
            <img src="./assets/leaf.svg" alt="icone de folha de árvore" />
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
            <img
              src="./assets/sun-time.svg"
              alt="icone de um sol com um relógio dentro"
            />
            Horário do sol
          </h2>
          <div className="sun-chart-wrapper">
            <div className="sun-chart">
              <div className="chart">
                <img
                  src="./assets/sun-chart.svg"
                  alt="imagem de um gráfico semi circulo com traços"
                />
              </div>
              <time className="now">17:48</time>
            </div>
          </div>
          <div className="time">
            <time className="sunrise">06:00</time>
            <time className="sunset">18:52</time>
          </div>
        </section>

        <section className="week-weather">
          <div className="day">
            <h4 className="title">Amanhã</h4>
            <img src="./assets/weather-clouds.svg" alt="" />
            <p className="maxmin">
              21° <span>16°</span>
            </p>
          </div>

          <div className="day">
            <h4 className="title">Sexta</h4>
            <img src="./assets/weather-sun.svg" alt="" />
            <p className="maxmin">
              28° <span>16°</span>
            </p>
          </div>

          <div className="day">
            <h4 className="title">Sábado</h4>
            <img src="./assets/weather-rain.svg" alt="" />
            <p className="maxmin">
              20° <span>16°</span>
            </p>
          </div>

          <div className="day">
            <h4 className="title">Domingo</h4>
            <img src="./assets/weather-thunder.svg" alt="" />
            <p className="maxmin">
              28° <span>26°</span>
            </p>
          </div>

          <div className="day">
            <h4 className="title">Segunda</h4>
            <img src="./assets/weather-cloudy.svg" alt="" />
            <p className="maxmin">
              26° <span>20°</span>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
