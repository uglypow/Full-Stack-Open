const MultipleSearchResult = ({ countries, showCountryInfo }) => {
    return (
        <ul>
            {
                countries.map(country =>
                    <li key={country.name.common}>
                        {country.name.common}
                        <button onClick={() => showCountryInfo(country)}>show</button>
                    </li>)
            }
        </ul>
    )
}

export default MultipleSearchResult