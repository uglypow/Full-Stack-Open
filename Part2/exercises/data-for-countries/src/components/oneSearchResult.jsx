const oneSearchResult = ({ country, weather}) => {
    const flagStyle = {
        width: 200
    }

    console.log('oneSearchResult weather datas: ', weather)
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