import axios from 'axios';
import { useEffect, useState } from 'react';
const App = () => {
	const [input, setInput] = useState('');
	const [countries, setCountries] = useState([]);

	useEffect(() => {
		axios.get('https://restcountries.com/v3.1/all').then((response) => {
			setCountries(response.data);
		});
	}, []);

	const handleInput = (event) => setInput(event.target.value);

	const matchedCountries = countries.filter((country) =>
		country.name.common.toLowerCase().includes(input)
	);

	const displayMatchedCountries = () => {
		if (input === '') {
			return <p>Type to search</p>;
		} else if (matchedCountries.length >= 10) {
			return <p>Too many matches, specify another filter</p>;
		} else if (matchedCountries.length === 1) {
			return (
				<>
					<h1>{matchedCountries[0].name.common}</h1>
					<div>capital {matchedCountries[0].capital}</div>
					<div>area {matchedCountries[0].area}</div>
					<h3>languagues:</h3>
					<ul>
						{Object.values(matchedCountries[0].languages).map((language) => (
							<li key={language}>{language}</li>
						))}
					</ul>
					<img
						src={matchedCountries[0].flags.png}
						alt={`Flag of ${matchedCountries[0].name.common}`}
					/>
				</>
			);
		} else
			return (
				<ul>
					{matchedCountries.map((country) => (
						<li key={country.cca3}>{country.name.common}</li>
					))}
				</ul>
			);
	};

	return (
		<>
			<label>
				find countries
				<input type='text' value={input} onChange={handleInput} />
			</label>
			<div>{displayMatchedCountries()}</div>
		</>
	);
};

export default App;
