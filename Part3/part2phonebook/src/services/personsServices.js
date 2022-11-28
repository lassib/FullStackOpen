import axios from "axios";
const url = "http://localhost:3001/api/persons";

const getAllPersons = () => {
  console.log("Feching all persons");
  const request = axios.get(url);
  return request.then((response) => response.data);
};

const createPerson = (newPerson) => {
  console.log("Adding new person");
  const request = axios.post(url, newPerson);
  return request.then((response) => response.data)
};

const deletePerson = (id) => {
  console.log("Deleting persons");
  const request = axios.delete(`${url}/${id}`);
  return request.then((response) => response.data)
};

const updatePerson = (id, updatedPerson) => {
  console.log("Updating person");
  const request = axios.put(`${url}/${id}`, updatedPerson);
  return request.then((response) => response.data)
};

const personServices = {
  getAllPersons,
  createPerson,
  deletePerson,
  updatePerson,
};

export default personServices;
