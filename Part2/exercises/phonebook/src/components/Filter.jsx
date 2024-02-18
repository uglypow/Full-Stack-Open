const Filter = ({ searchPerson, setSearchPerson}) => {
    return (
        <div>
            filter shown with <input value={searchPerson} onChange={handleSearchChange} />
        </div>
    )
}

const handleSearchChange = (event) => {
    setSearchPerson(event.target.value)
}

export default Filter