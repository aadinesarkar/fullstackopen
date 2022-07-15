import { useState } from "react";

const Button = ({ onClick, text }) => {
	return (
		<>
			<button onClick={onClick}>{text}</button>
		</>
	);
};

const StatisticLine = ({ text, num }) => (
	<tr>
		<td>{text}</td>
		<td>{num}</td>
	</tr>
);

const Statistics = ({ good, neutral, bad }) => {
	if (good === 0 && neutral === 0 && bad === 0) {
		return <div>No feedback given</div>;
	} else {
		return (
			<table>
				<tbody>
					<StatisticLine text="good" num={good} />
					<StatisticLine text="neutral" num={neutral} />
					<StatisticLine text="bad" num={bad} />
					<StatisticLine text="total" num={good + neutral + bad} />
					<StatisticLine
						text="average"
						num={(1 * good + 0 * neutral - 1 * bad) / (good + neutral + bad)}
					/>
					<StatisticLine
						text="positive %"
						num={(good * 100) / (good + neutral + bad)}
					/>
				</tbody>
			</table>
		);
	}
};

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const handleClick = (state, setState) => () => {
		state = state + 1;
		setState(state);
	};

	return (
		<>
			<h1>Give Feedback</h1>
			<Button onClick={handleClick(good, setGood)} text="good" />
			<Button onClick={handleClick(neutral, setNeutral)} text="neutral" />
			<Button onClick={handleClick(bad, setBad)} text="bad" />
			<h1>Statistics</h1>
			<Statistics good={good} neutral={neutral} bad={bad} />
		</>
	);
};

export default App;
