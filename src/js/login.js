// Tuodaan kirjautumissivulla käytettävät css-tyylit
import '../css/login.css';
import '../css/snackbar.css';
// Tuodaan fetchData-funktio API-kutsuja varten
import { fetchData } from './fetch.js';


console.log('Moi luodaan nyt tokeneita ja kirjaudutaan sisään');

// Funktio uuden käyttäjän rekisteroimiseen
const registerUser = async (event) => {
  // Estetään lomakkeen oletustoiminto
	event.preventDefault();

	// Haetaan oikea formi
	const registerForm = document.querySelector('.registerForm');

	// Haetaan formista arvot
	const username = registerForm.querySelector('#username').value.trim();
	const password = registerForm.querySelector('#password').value.trim();
	const email = registerForm.querySelector('#email').value.trim();

	// Luodaan body lähetystä varten taustapalvelun vaatimaan muotoon
	const bodyData = {
		username: username,
		password: password,
		email: email,
	};

	// Endpoint
	const url = 'http://localhost:3000/api/users';

	// Options
	const options = {
		body: JSON.stringify(bodyData),
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
		},
	};
	console.log(options);

	// Hae data
	const response = await fetchData(url, options);

	if (response.error) {
		console.error('Error adding a new user:', response.error);
		return;
	}

	if (response.message) {
		console.log(response.message, 'success');
	}

	console.log(response);
	registerForm.reset(); // tyhjennetään formi
};

const loginUser = async (event) => {
	event.preventDefault();

	// Haetaan oikea formi
	const loginForm = document.querySelector('.loginForm');

	// Haetaan formista arvot
	const username = loginForm.querySelector('input[name=username]').value;
	const password = loginForm.querySelector('input[name=password]').value;

	// Luodaan body lähetystä varten taustapalvelun vaatimaan muotoon
	const bodyData = {
		username: username,
		password: password,
	};

	// Endpoint
	const url = 'http://localhost:3000/api/users/login';

	// Options
	const options = {
		body: JSON.stringify(bodyData),
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
		},
	};
	console.log(options);

	// Hae data
	const response = await fetchData(url, options);

	if (response.error) {
		console.error('Error login in:', response.error);
		return;
	}

	if (response.message) {
		console.log(response.message, 'success');
		localStorage.setItem('token', response.token);
		localStorage.setItem('name', response.user.username);
		logResponse('loginResponse', `Login successful. Welcome ${response.user.username}!`);
		setTimeout(function () {
			window.location.href = 'home.html';
		}, 3000);
	}

	console.log(response);
	loginForm.reset(); // tyhjennetään formi
};


// Funktio joka näyttää viestin HTML-elementissä
function logResponse(codeblock, text) {
	document.getElementById(codeblock).innerText = text;
}

// Haetaan rekisteröintilomake ja lisätään submit tapahtuma
const registerForm = document.querySelector('.registerForm');
registerForm.addEventListener('submit', registerUser);
// Haetaan kirjautumislomake ja lisätään submit tapahtuma
const loginForm = document.querySelector('.loginForm');
loginForm.addEventListener('submit', loginUser);

