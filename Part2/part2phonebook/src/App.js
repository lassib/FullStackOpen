import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [filterPersons, setFilterPersons] = useState(persons);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const Persons = (props) => {
    let shownPersons = "";
    filter === ""
      ? (shownPersons = props.persons)
      : (shownPersons = props.filterPersons);

    return (
      <ul>
        {shownPersons.map((person, i) => (
          <li key={i}>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    );
  };

  const handleNewPerson = (event) => {
    event.preventDefault();
    const nameArray = persons.map((obj) => obj.name);
    const addPerson = [
      {
        name: newName,
        number: newNumber,
      },
    ];

    if (nameArray.includes(`${newName}`)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(addPerson));
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setFilterPersons(
      persons.filter((person) =>
        person.name
          .toLocaleLowerCase()
          .includes(event.target.value.toLocaleLowerCase())
      )
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with <input onChange={handleFilterChange} />
        </div>
        <div>
          <h2>add a new</h2>
          name: <input onChange={handleNameChange} />
          <br></br>
          number: <input onChange={handleNumberChange} />
          <br></br>
          <button type="submit" onClick={handleNewPerson}>
            add
          </button>
        </div>
      </form>
      <div>
        <h2>Numbers</h2>
        <Persons
          persons={persons}
          filterPersons={filterPersons}
          filter={filter}
        ></Persons>
      </div>
      <div>debug: {newName}</div>
    </div>
  );
};

export default App;
