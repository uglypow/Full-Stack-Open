import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons' 

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchPerson, setSearchPerson] = useState('')
  const filteredPerson = persons.filter(persons =>
    persons.name.toLowerCase().includes(searchPerson.toLowerCase())
  );

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

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchPerson(event.target.value)
  }




  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchPerson={searchPerson}
        handleSearchChange={handleSearchChange} />
      <h2>Add a new</h2>
      <PersonForm newNumber={newNumber}
        newName={newName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPersons={addPersons} />
      <h2>Numbers</h2>
      <Persons filteredPerson={filteredPerson}/>
    </div>
  )
}

export default App