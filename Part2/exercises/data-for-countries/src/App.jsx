import { useEffect, useState } from 'react'
import axios from 'axios'
import MultipleSearchResult from './components/multipleSearchResult'
import OneSearchResult from './components/oneSearchResult'

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('')
  const [weather, setWeather] = useState(null)

  const countryUrl = `https://studies.cs.helsinki.fi/restcountries/api/all`
  const api_key = import.meta.env.VITE_SOME_KEY

  useEffect(() => {
    if (search != '') {
      axios
        .get(countryUrl)
        .then(countries => {
          const countriesData =
            countries.data
              .filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))

          countriesData.length === 1 ? getWeather(countriesData[0]) : null

          if (countriesData.length > 10) {
            setMessage('Too many matches, specify another filter')
            setCountries([])
            setWeather(null)
          }
          else {
            setMessage('')
            setCountries(countriesData)
          }
        })
        .catch(error => {
          console.log(error)
        })
      // reset the state if search is empty
    } else {
      setMessage('')
      setCountries([])
    }
  }, [search])


  // search on enter (add onKeyUp in the input)

  // const searchCountry = (event) => {
  //   if (event.key === 'Enter') {
  //     axios
  //       .get(countryUrl)
  //       .then(countries => {
  //         const countriesData =
  //           countries.data
  //             .filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))

  //         countriesData.length === 1 ? getWeather(countriesData[0]) : null

  //         if (countriesData.length > 10) {
  //           setMessage('Too many matches, specify another filter')
  //           setSearch('')
  //           setCountries([])
  //           setWeather(null)
  //         }
  //         else {
  //           setMessage('')
  //           setSearch('')
  //           setCountries(countriesData)
  //         }
  //       })
  //       .catch(error => {
  //         console.log(error)
  //       })
  //   }
  // }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const getWeather = (country) => {
    // console.log('getWeaher received data, ', country)
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}`)
      .then(response => {
        // console.log("root weather data: ", response.data)
        setWeather(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const showCountryInfo = (country) => {
    getWeather(country)
    setCountries([country])
  }

  return (
    <div>
      find countries <input value={search} onChange={handleSearch} /><br />
      {message}
      {/* {console.log('weather data before oneSearchResult: ', weather)} */}
      {countries.length === 1 && weather != null ?
        <OneSearchResult country={countries[0]} weather={weather} /> :
        <MultipleSearchResult countries={countries} showCountryInfo={showCountryInfo} />
      }
    </div>
  )
}

export default App
