import { useState } from "react";

const Filter = (props) => {
  const handleFilterChange = (event) => {
    props.setFilter(event.target.value);
    props.setFilterPersons(
      props.persons.filter((person) =>
        person.name
          .toLocaleLowerCase()
          .includes(event.target.value.toLocaleLowerCase())
      )
    );
  };

  return (
    <div>
      filter shown with <input onChange={handleFilterChange} />
    </div>
  );
};

const PersonForm = (props) => {
  const handleNewPerson = (event) => {
    event.preventDefault();
    const nameArray = props.persons.map((obj) => obj.name);
    const addPerson = [
      {
        name: props.newName,
        number: props.newNumber,
      },
    ];

    if (nameArray.includes(`${props.newName}`)) {
      alert(`${props.newName} is already added to phonebook`);
    } else {
      props.setPersons(props.persons.concat(addPerson));
    }
  };

  const handleNameChange = (event) => {
    props.setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    props.setNewNumber(event.target.value);
  };

  return (
    <form>
      <div>
        name: <input onChange={handleNameChange} />
        <br></br>
        number: <input onChange={handleNumberChange} />
        <br></br>
        <button type="submit" onClick={handleNewPerson}>
          add
        </button>
      </div>
    </form>
  );
};

const Persons = (props) => {
  let shownPersons = "";
  props.filter === "" ? (shownPersons = props.persons) : (shownPersons = props.filterPersons);

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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        persons={persons}
        setFilterPersons={setFilterPersons}
        setFilter={setFilter}
      />
      <h3>Add a new</h3>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <div>
        <h3>Numbers</h3>
        <Persons
          persons={persons}
          filterPersons={filterPersons}
          filter={filter}
        />
      </div>
    </div>
  );
};

export default App;
