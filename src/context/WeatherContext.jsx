import { createContext, useState, useEffect } from "react";
import apiWeather from "../axios/api";


export const WeatherContext = createContext([]);

export const WeatherProvider = ({children})=>{
    const [weather, setWeather] = useState();

    useEffect(() => {
        apiWeather
          .get(
            "&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,windspeed_180m&timezone=America/Fortaleza&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max"
          )
          .then((response) => setWeather(response.data))
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }, []);

    return (
    <WeatherContext.Provider value={{weather, setWeather}}>{children}</WeatherContext.Provider>
    )
}