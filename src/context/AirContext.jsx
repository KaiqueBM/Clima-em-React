import { createContext, useState, useEffect } from "react";
import apiAir from "../axios/apiAir";


export const AirContext = createContext([]);

export const AirProvider = ({children})=>{
    const [air, setAir] = useState();

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
        apiAir
          .get(
            `?latitude=${latitude}&longitude=${longitude}&timezone=America/Fortaleza&&hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,us_aqi`
          )
          .then((response) => setAir(response.data))
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }, []);

    return (
    <AirContext.Provider value={{air, setAir}}>{children}</AirContext.Provider>
    )
}