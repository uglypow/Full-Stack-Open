import { useEffect, useState } from 'react'
import axios from 'axios'

const oneSearchResult = ({ country}) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        const api_key = import.meta.env.VITE_SOME_KEY
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}`)
            .then(response => {
                console.log('fetched weather data completed', response)
                setWeather(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const flagStyle = {
        width: 200
    }

    if (!weather) {
        return
    }

    return (
        <>
            <h2>{country.name.common}</h2>
            <p>
                capital {country.capital}<br />
                area {country.area}
            </p>
            <h4>languages: <br /></h4>
            <ul>
                {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img style={flagStyle} src={country.flags.png} />
            <h2>Weather in {country.capital}</h2>
            <p>temperature {(weather.main.temp - 273.15).toFixed(2)} Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
            <p>wind {weather.wind.speed} m/s</p>
        </>
    )
}

export default oneSearchResult