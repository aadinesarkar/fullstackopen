import React from 'react';

const Persons = ({ namesToShow, handleDeletion }) => {
	return (
		<div>
			{namesToShow.map((person) => (
				<div key={person.name}>
					{person.name} {person.number}{' '}
					<button onClick={() => handleDeletion(person)}>delete</button>
				</div>
			))}
		</div>
	);
};

export default Persons;
