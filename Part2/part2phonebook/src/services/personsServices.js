import axios from "axios";
const url = "http://localhost:3001/persons";

const getAllPersons = () => {
  const request = axios.get(url);
  return request.then((response) => response.data);
};

const createPerson = (newPerson) => {
    axios.post(`http://localhost:3001/persons`, newPerson);
  };

const personServices = {
  getAllPersons,
  createPerson,
};

export default personServices;
