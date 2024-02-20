import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchPerson, setSearchPerson] = useState('')
  const filteredPerson = persons.filter(persons =>
    persons.name.toLowerCase().includes(searchPerson.toLowerCase())
  );
  const [message, setMessage] = useState(null)
  const [status, setStatus] = useState()


  // Fetch persons data from server
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  // Event handlers

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchPerson(event.target.value)
  }

  const addPersons = (event) => {
    event.preventDefault()
    const tempNewName = {
      name: newName,
      number: newNumber,
    }

    const existPerson = checkExistPerson(persons, tempNewName)

    if (!existPerson) {
      personService
        .create(tempNewName)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setStatus('success')
          setMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })

    } else
      if (window.confirm(`${newName} is already addded to phonebook, replace the old number with a new one?`)) {
        personService
          .update(existPerson.id, tempNewName)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existPerson.id ? person : returnedPerson))
          })
          .catch(error => {
            setStatus('error')
            setMessage(`Information of ${existPerson.name} has already been removed from server`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setPersons(persons.filter(person => person.id !== existPerson.id))
          })
      }
  }

  const checkExistPerson = (persons, newPerson) => {
    const existingPerson = persons.find(item => item.name === newPerson.name);
    return existingPerson ? existingPerson : null;
  }

  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(item => item.id !== id))
        })
        .catch(error => {
          setStatus('error')
          setMessage(`Information of ${name} has already been removed from server`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  // End of event handlers

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} status={status}/>
      <Filter
        searchPerson={searchPerson}
        handleSearchChange={handleSearchChange} />
      <h2>Add a new</h2>
      <PersonForm
        newNumber={newNumber}
        newName={newName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPersons={addPersons} />
      <h2>Numbers</h2>
      <Persons
        persons={filteredPerson}
        removePerson={removePerson}
      />
    </div>
  )
}

export default App