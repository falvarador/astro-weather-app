import { useState } from 'preact/hooks'
import { Search } from '@components/search'

import { WeatherService } from './../services/weather-service'

function App () {
  const weatherService = new WeatherService()
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecast, setForecast] = useState(null)

  const handleOnSearchChange = async (searchData) => {
    const [lat, lon] = searchData.value.split(' ')

    const weather = await weatherService.searchWeather(lat, lon)
    const forecast = await weatherService.searchForecast(lat, lon)

    setCurrentWeather({ city: searchData.label, ...weather })
    setForecast({ city: searchData.label, ...forecast })

    console.log(weather)
    console.log(forecast)
  }

  return (
    <div>
      <Search onSearchChange={handleOnSearchChange} />
      {/* {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />} */}
    </div>
  )
}

export default App
