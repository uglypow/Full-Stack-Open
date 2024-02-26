const MultipleSearchResult = ({ countries, showCountryInfo }) => {
    if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }

    return (
        <ul>
            {countries.map(country =>
                <li key={country.name.common}>
                    {country.name.common}
                    <button onClick={() => showCountryInfo(country)}>show</button>
                </li>)}
        </ul>
    )
}

export default MultipleSearchResult