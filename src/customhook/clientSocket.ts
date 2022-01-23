import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io("wss://lula.soy.pe/");

export interface CurrentWeatherIot{
    humidity: number
    temperatureF: number
    temperatureC: number
    hotIndexF: number
    hotIndexC: number
    isAutomatic: boolean
    statusRele: boolean
}

const useCurrentWeather = ()=>{
    const [response, setResponse] = useState<CurrentWeatherIot|null>(null);

    const switchRele = ()=>{
        socket.emit("client:click-switch-rele",{message:"switchRele"});
    }

    const switchMode = ()=>{
        socket.emit("client:click-switch-mode",{message:"switchMode"});
    }



    useEffect(() => {        
      socket.on("server:current-wheater", (data:CurrentWeatherIot) => {
        setResponse(data);
      });

      socket.on("server:current-staus", (data:{isAutomatic:boolean, statusRele:boolean}) => {
        setResponse((status)=>{
            if(status){
                const {isAutomatic,statusRele, ...rest } = status;
                const updateStatus = {...rest, ...data};
                console.log("Update",updateStatus);
                return updateStatus;
            }
            return null
        });
      })
    }, []);
    return {
        response,
        switchMode,
        switchRele
    }
}
export default useCurrentWeather