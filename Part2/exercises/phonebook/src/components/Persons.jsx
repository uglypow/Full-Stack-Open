const Persons = ({filteredPerson}) => {
    return (
        <>
            {
                filteredPerson.map(person =>
                    <div key={person.id}>{person.name} {person.number}</div>)
            }
        </>
    )
}

export default Persons