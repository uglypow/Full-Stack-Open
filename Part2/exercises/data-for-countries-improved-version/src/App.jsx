import { useEffect, useState } from 'react'
import axios from 'axios'
import MultipleSearchResult from './components/multipleSearchResult'
import OneSearchResult from './components/oneSearchResult'

function App() {
  const [countries, setCountries] = useState(null)
  const [search, setSearch] = useState('')

  const countryUrl = `https://studies.cs.helsinki.fi/restcountries/api/all`
  
  // Now fetch countries data only once
  useEffect(() => {
    axios
      .get(countryUrl)
      .then(countries => {
        console.log('fetched countries data completed', countries)
        setCountries(countries.data)
      })
  }, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const showCountryInfo = (country) => {
    setSearch(country.name.common)
  }

  if (!countries) {
    return (
      <div>
        loading...
      </div>
    )
  }

  // Check for all matched result
  const matchedContries = countries.filter(c => c.name.common.toLowerCase().includes(search.toLocaleLowerCase()))

  // There might be two matches so check again if there is 1 exactly match result
  // Case: Sudan and South Sudan
  const oneMatchedCountry = countries.filter(c => c.name.common.toLowerCase() === search.toLowerCase());

  console.log('matched countries', matchedContries)
  console.log('one matched country', oneMatchedCountry)


  return (
    <div>
      find countries <input value={search} onChange={handleSearch} /><br />
      {search === '' ?
        null // return nothing is search is empty
        : // else return matched countries
        (matchedContries.length === 1 || oneMatchedCountry.length === 1 ?
          // oneMatchedCountry might not have been initialized
          // Case: search "tha" matched with "Thailand" but oneMatchedCountry is empty
          <OneSearchResult country={oneMatchedCountry.length === 1 ? oneMatchedCountry[0] : matchedContries[0]} />
          :
          <MultipleSearchResult countries={matchedContries} showCountryInfo={showCountryInfo} />
        )}
    </div>
  )
}

export default App
