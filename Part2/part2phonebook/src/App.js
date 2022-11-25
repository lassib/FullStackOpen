import { useEffect, useState } from "react";
import personsServices from "./services/personsServices";

const Notification = (props) => {
  if (props.message === null) {
    return null;
  }
  return <div className={props.style}>{props.message}</div>;
};

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
    const addPerson = {
      name: props.newName,
      number: props.newNumber,
      id: Math.floor(Math.random() * 10000),
    };

    if (nameArray.includes(`${props.newName}`)) {
      handleUpdatePerson(addPerson);
    } else {
      props.setPersons(props.persons.concat(addPerson));
      personsServices
        .createPerson(addPerson)
        .then(() => {
          props.setCssStyle("added");
          props.setErrorMessage(`Added: ${props.newName}`);
          props.clearErrorMsg();
        })
        .catch((error) => {
          props.setCssStyle("error");
          props.setErrorMessage(`${error.response.data.error}`);
          console.log(error.response.data);
          props.clearErrorMsg();;
        });
    }
  };

  const handleNameChange = (event) => {
    props.setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    props.setNewNumber(event.target.value);
  };

  const handleUpdatePerson = (personObj) => {
    if (
      window.confirm(
        `${personObj.name} is already added to the phonebook, replace the old number with a new one?`
      )
    ) {
      const findPerson = props.persons.find(
        (person) => person.name === personObj.name
      );
      personsServices.updatePerson(findPerson.id, personObj)
      .then(() => {
        props.setNewName("");
        props.setNewNumber("");
        props.setCssStyle("added");
        props.setErrorMessage(`Changed ${personObj.name}'s number`);
        props.clearErrorMsg();
      })
      .catch((error) => {
        props.setCssStyle("error");
        props.setErrorMessage("Updating failed.");
        props.clearErrorMsg();
      });
      const fileteredPersons = props.persons.map((personName) =>
        personName.name === personObj.name ? personObj : personName
      );
      props.setPersons(fileteredPersons);
    }
  };

  return (
    <form>
      <div>
        name: <input value={props.newName} onChange={handleNameChange} />
        <br></br>
        number: <input value={props.newNumber} onChange={handleNumberChange} />
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
  props.filter === ""
    ? (shownPersons = props.persons)
    : (shownPersons = props.filterPersons);

  return (
    <ul>
      {shownPersons.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
          <button onClick={props.handleDeletePerson(person.name, person.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterPersons, setFilterPersons] = useState(persons);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [cssStyle, setCssStyle] = useState("");

  const updateAllPersons = () => {
    personsServices.getAllPersons().then((persons) => {
      setPersons(persons);
    });
  };

  const clearErrorMsg = () => {
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  useEffect(() => {
    updateAllPersons();
  }, []);

  const handleDeletePerson = (name, id) => {
    return () => {
      if (window.confirm(`Delete: ${name}?`)) {
        personsServices
          .deletePerson(id)
          .then(() => {
            const fileteredPersons = persons.filter(
              (persons) => persons.id !== id
            );
            setPersons(fileteredPersons);
            setCssStyle("error");
            setErrorMessage(`Deleted: ${name}.`);
            clearErrorMsg();
          })
          .catch((error) => {
            setCssStyle("error");
            setErrorMessage(
              `Information of ${name} has already been removed from server`
            );
            clearErrorMsg();
          });
      }
    };
  };

  return (
    <div>
      <Notification message={errorMessage} style={cssStyle} />
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
        setErrorMessage={setErrorMessage}
        setCssStyle={setCssStyle}
        clearErrorMsg={clearErrorMsg}
      />
      <div>
        <h3>Numbers</h3>
        <Persons
          persons={persons}
          filterPersons={filterPersons}
          filter={filter}
          handleDeletePerson={handleDeletePerson}
        />
      </div>
    </div>
  );
};

export default App;
