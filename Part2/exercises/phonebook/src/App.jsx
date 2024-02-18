import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchPerson, setSearchPerson] = useState('')
  const filteredPerson = persons.filter(persons =>
    persons.name.toLowerCase().includes(searchPerson.toLowerCase())
  );

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        searchPerson={searchPerson}
        setSearchPerson={setSearchPerson} />
      <h2>Add a new</h2>
      <PersonForm
        newNumber={newNumber}
        newName={newName}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        persons={persons}
        setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons filteredPerson={filteredPerson} />
    </div>
  )
}

export default App