import React from 'react';

const FormElement = ({ displayName, state, stateHandler }) => {
	return (
		<div>
			{displayName}: <input value={state} onChange={stateHandler} />
		</div>
	);
};

const PersonForm = ({
	addNewPerson,
	newName,
	handleChangeName,
	newNumber,
	handleChangeNumber,
}) => {
	return (
		<>
			<form onSubmit={addNewPerson}>
				<FormElement
					displayName={'name'}
					state={newName}
					stateHandler={handleChangeName}
				/>
				<FormElement
					displayName={'number'}
					state={newNumber}
					stateHandler={handleChangeNumber}
				/>
				<div>
					<button type='submit'>add</button>
				</div>
			</form>
		</>
	);
};

export default PersonForm;
