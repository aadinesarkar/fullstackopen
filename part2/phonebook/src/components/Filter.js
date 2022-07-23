import React from 'react';

const Filter = ({ newFilter, handleChangeFilter }) => {
	return (
		<div>
			filter shown with
			<input type='text' value={newFilter} onChange={handleChangeFilter} />
		</div>
	);
};

export default Filter;
