import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", number: "0443664373" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const Persons = (props) => {
    return (
      <ul>
        {props.persons.map((person, i) => (
          <li key={i}>{person.name} {person.number}</li>
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={handleNameChange} />
        </div>
        <div>
          number: <input onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit" onClick={handleNewPerson}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <Persons persons={persons}></Persons>
      </div>
      <div>debug: {newName}</div>
    </div>
  );
};

export default App;
