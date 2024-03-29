import axios from 'axios';
const baseUrl = '/api/persons';

const getAll = () => {
	return axios.get(baseUrl).then((response) => response.data);
};
const create = (newPerson) => {
	return axios.post(baseUrl, newPerson).then((response) => response.data);
};

const remove = (id) => {
	return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

const update = (id, changedPerson) => {
	return axios
		.put(`${baseUrl}/${id}`, changedPerson)
		.then((response) => response.data);
};

const exportedObject = {
	getAll,
	create,
	remove,
	update,
};

export default exportedObject;
