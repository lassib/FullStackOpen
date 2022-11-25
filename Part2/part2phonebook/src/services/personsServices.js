import axios from "axios";
const url = "http://localhost:3001/persons";

const getAllPersons = () => {
  const request = axios.get(url);
  return request.then((response) => response.data);
};

const createPerson = (newPerson) => {
  axios.post(`http://localhost:3001/persons`, newPerson);
};

const deletePerson = (id) => {
  axios.delete(`${url}/${id}`);
};

const updatePerson = (id, updatedPerson) => {
  axios.put(`${url}/${id}`, updatedPerson);
};

const personServices = {
  getAllPersons,
  createPerson,
  deletePerson,
  updatePerson,
};

export default personServices;
