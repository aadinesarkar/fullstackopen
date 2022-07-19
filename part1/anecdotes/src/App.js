import { useState } from 'react';

const Anecdote = ({ anecdote, votes }) => {
	return (
		<>
			<div>{anecdote}</div>
			<div>has {votes} votes</div>
		</>
	);
};

const App = () => {
	const anecdotes = [
		'If it hurts, do it more often.',
		'Adding manpower to a late software project makes it later!',
		'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		'Premature optimization is the root of all evil.',
		'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
		'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
	];

	const [selected, setSelected] = useState({
		pos: 0,
		votes: Array(7).fill(0),
		highest: 0,
	});

	const nextAnecdote = () => {
		const newState = {
			...selected,
			pos: Math.floor(Math.random() * 7),
		};
		setSelected(newState);
	};

	const incrementVote = () => {
		let selectedCopy = { ...selected };
		selectedCopy.votes[selectedCopy.pos]++;
		selectedCopy.highest = getAnecdoteWithMostVotes();
		setSelected(selectedCopy);
	};

	const getAnecdoteWithMostVotes = () => {
		let highest = selected.highest;

		for (let i = 0; i < selected.votes.length; i++) {
			if (selected.votes[i] > selected.votes[highest]) {
				highest = i;
			}
		}
		return highest;
	};

	return (
		<>
			<h1>Anecdote of the day</h1>
			<Anecdote
				anecdote={anecdotes[selected.pos]}
				votes={selected.votes[selected.pos]}
			/>
			<button onClick={incrementVote}>Vote</button>
			<button onClick={nextAnecdote}>next anecdote</button>
			<h1>Anecdote with the most votes</h1>
			<Anecdote
				anecdote={anecdotes[selected.highest]}
				votes={selected.votes[selected.highest]}
			/>
		</>
	);
};

export default App;
