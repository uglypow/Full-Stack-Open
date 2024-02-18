const PersonForm = ({ newNumber, newName, setNewName, setNewNumber, persons ,setPersons }) => {
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const addPersons = (event) => {
        event.preventDefault()
        const tempNewName = {
            name: newName,
            number: newNumber,
            id: persons.length + 1,
        }

        if (!checkExistName(persons, tempNewName)) {
            setPersons(persons.concat(tempNewName))
            setNewName('')
            setNewNumber('')
        } else
            alert(`${newName} is already added to phonebook`)
    }
    const checkExistName = (persons, newPerson) => {
        return persons.some(item => item.name === newPerson.name);
    }

    return (
        <form onSubmit={addPersons}>
            <div>
                name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm