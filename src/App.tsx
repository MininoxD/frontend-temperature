import { useState } from 'react'

import logo from './logo.svg'
import './App.css'
import useCurrentWeather from './customhook/clientSocket'


function App() {
  const {response,switchMode,switchRele } = useCurrentWeather()
  console.log(response);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Temperatura: {response?.temperatureF}°</p>
        <p>Humedas: {response?.humidity}%</p>
        <p>Calefactor: {response?.statusRele ? 'Prendido':'Apagado'}</p>
        <p>Modo: {response?.isAutomatic ? 'Automatico':'Manual'}</p>
        <p>
            <button type="button" onClick={switchMode}>
              {
                response?.isAutomatic ? 'Cambiar a modo Manual' : 'Cambiar a modo Automatico'
              }
            </button>
        </p>
        <p>
          {
            !response?.isAutomatic && 
            <button type="button" onClick={switchRele}>
              
              {
                response?.statusRele ? 'Apgalar Calefactor' : 'Prender Calefactor'
              }
            </button>
          }
        </p>
      </header>
    </div>
  )
}

export default App
