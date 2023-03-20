import { createContext, useState, useEffect } from "react";
import apiWeather from "../axios/api";

export const WeatherContext = createContext([]);

export const WeatherProvider = ({children})=>{
    const [weather, setWeather] = useState();

    const [latitude, setLatitude] = useState(-23.565414759900598)
    const [longitude, setLongitude] = useState(-46.65177434374316)

function sucess(pos){
    setLatitude(pos.coords.latitude)
    setLongitude(pos.coords.longitude)
  }
  function error(err){
    console.log(err)
  }
  navigator.geolocation.getCurrentPosition(sucess, error)

    useEffect(() => {
        apiWeather
          .get(
            `?latitude=${latitude}&longitude=${longitude}&timezone=America/Fortaleza&&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,windspeed_180m&timezone=America/Fortaleza&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max`
          )
          .then((response) => setWeather(response.data))
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }, [latitude]);

    return (
    <WeatherContext.Provider value={{weather, setWeather, latitude, longitude}}>{children}</WeatherContext.Provider>
    )
}