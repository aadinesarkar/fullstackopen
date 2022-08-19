import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [newFilter, setNewFilter] = useState('');
	const [showAll, setShowAll] = useState(true);

	useEffect(() => {
		axios
			.get('http://localhost:3001/persons')
			.then((response) => setPersons(response.data));
	}, []);

	const handleChangeName = (event) => {
		setNewName(event.target.value);
	};

	const handleChangeNumber = (event) => {
		setNewNumber(event.target.value);
	};

	const handleChangeFilter = (event) => {
		if (event.target.value !== null) {
			setNewFilter(event.target.value);
			setShowAll(false);
		}
	};

	const addNewPerson = (event) => {
		event.preventDefault();
		if (persons.some((person) => person.name === newName)) {
			window.alert(`${newName} is already added to phonebook`);
		} else {
			const newPerson = {
				name: newName,
				number: newNumber,
			};
			setPersons(persons.concat(newPerson));
			setNewName('');
			setNewNumber('');
		}
	};

	const namesToShow = showAll
		? persons
		: persons.filter((person) =>
				person.name.toLowerCase().includes(newFilter.toLowerCase())
		  );

	return (
		<div>
			<h1>Phonebook</h1>
			<Filter newFilter={newFilter} handleChangeFilter={handleChangeFilter} />
			<h2>Add a new</h2>
			<PersonForm
				addNewPerson={addNewPerson}
				newName={newName}
				handleChangeName={handleChangeName}
				newNumber={newNumber}
				handleChangeNumber={handleChangeNumber}
			/>
			<h2>Numbers</h2>
			<Persons namesToShow={namesToShow} />
		</div>
	);
};

export default App;
