const Filter = ({ searchPerson, setSearchPerson }) => {
    const handleSearchChange = (event) => {
        setSearchPerson(event.target.value)
    }
    
    return (
        <div>
            filter shown with <input value={searchPerson} onChange={handleSearchChange} />
        </div>
    )
}

export default Filter