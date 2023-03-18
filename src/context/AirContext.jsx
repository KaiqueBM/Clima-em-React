import { createContext, useState, useEffect } from "react";
import apiAir from "../axios/apiAir";


export const AirContext = createContext([]);

export const AirProvider = ({children})=>{
    const [air, setAir] = useState();

    useEffect(() => {
        apiAir
          .get(
            "&timezone=America/Fortaleza&&hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,us_aqi"
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