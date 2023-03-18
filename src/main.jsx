import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { WeatherProvider } from './context/WeatherContext'
import { AirProvider } from './context/AirContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
    <WeatherProvider>
      <AirProvider>
      <App />
      </AirProvider>
    </WeatherProvider>
  //</React.StrictMode>,
)
