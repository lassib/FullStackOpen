import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const Persons = (props) => {
    return (
      <ul>
        {props.persons.map((person, i) => (
          <li key={i}>{person.name}</li>
        ))}
      </ul>
    );
  };

  const handleNewPerson = (event) => {
    event.preventDefault();
    const addName = [{
      name: newName,
    }];
    setPersons(persons.concat(addName));
  };

  const handleChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={handleChange} />
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
