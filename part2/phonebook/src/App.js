import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import services from './components/services';
import Notification from './components/Notification';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [newFilter, setNewFilter] = useState('');
	const [showAll, setShowAll] = useState(true);
	const [successMessage, setSuccessMessage] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	useEffect(() => {
		services.getAll().then((response) => {
			setPersons(response);
		});
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
			if (
				window.confirm(
					`${newName} is already added to phonebook, replace the old number with a new one?`
				)
			) {
				const id = persons.find((person) => person.name === newName).id;
				const updatedPerson = {
					name: newName,
					number: newNumber,
				};
				services
					.update(id, updatedPerson)
					.then((response) => {
						setPersons(
							persons.map((person) => (person.id === id ? response : person))
						);
						setNewName('');
						setNewNumber('');
						setSuccessMessage(`Updated ${response.name}`);
						setTimeout(() => {
							setSuccessMessage(null);
						}, 5000);
					})
					.catch((error) => {
						setNewName('');
						setNewNumber('');
						setErrorMessage(
							`Information of ${updatedPerson.name} has already been removed from server`
						);
						setTimeout(() => {
							setErrorMessage(null);
						}, 5000);
						setPersons(persons.filter((p) => p.id !== id));
					});
			}
		} else {
			const newPerson = {
				name: newName,
				number: newNumber,
			};
			services
				.create(newPerson)
				.then((response) => {
					setPersons(persons.concat(response));
					setNewName('');
					setNewNumber('');
					setSuccessMessage(`Added ${response.name}`);
					setTimeout(() => {
						setSuccessMessage(null);
					}, 5000);
				})
				.catch((error) => {
					setNewName('');
					setNewNumber('');
					setErrorMessage(error.response.data.error);
					setTimeout(() => {
						setErrorMessage(null);
					}, 5000);
				});
		}
	};

	const handleDeletion = (person) => {
		if (window.confirm(`Delete ${person.name}?`)) {
			services.remove(person.id).then((response) => {
				setPersons(persons.filter((p) => p.id !== person.id));
			});
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
			<Notification message={successMessage} color={'green'} />
			<Notification message={errorMessage} color={'red'} />
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
			<Persons namesToShow={namesToShow} handleDeletion={handleDeletion} />
		</div>
	);
};

export default App;
