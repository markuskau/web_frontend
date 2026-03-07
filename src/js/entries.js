// Tuodaan fetchData-funktio API-kutsuja varten
import { fetchData } from './fetch.js';


// Tässä on hyödynnetty tekoälyä osaan koodeista, mutta koodit kirjoitettu itse ja tarkistettu ymmärretäviksi, sekä katsottu että vastaa kurssin materiaaleja.

// Haetaan elementti johon diary-kortit lisätään
const diaryContainer = document.querySelector('.diary-card-area');

/////////////////////////////
// Dialog
/////////////////////////////

// Haetaan dialogi-elementti
const dialog = document.querySelector(".diary_dialog");
// Haetaan dialogin close-nappi
const closeButton = document.querySelector(".diary_dialog button");
//"Close" nappi sulkee dialogin
closeButton.addEventListener("click", () => {
  dialog.close();
});

////////////////////////////
// Merkintöjen haku
////////////////////////////

// Funktio joka hakee kaikki diary_merkinnät backendistä
const getEntries = async (event) => {
  const url = 'http://localhost:3000/api/entries';
  let headers = {};
  let token = localStorage.getItem('token');
  console.log(token);
  if (token) {
    headers = { Authorization: `Bearer ${token}` };
  }
  const options = {
    headers: headers,
  };

  // Haetaan data palvelimelta
  const response = await fetchData(url, options);

  // Virheiden käsittely
  if (response.error) {
    console.error('Error login in:', response.error);
    return;
  }

  if (response.message) {
    console.log(response.message, 'success');
  }

  console.log(response);

  /////////////////////////////////////
  // Korttien luonti käyttöliittymään
  /////////////////////////////////////

  // luodaan lennossa tarvittavat kortit
  diaryContainer.innerHTML = '';
  response.forEach((entry) => {
    // luodaan aina yksittäinen kortti per rivi eli entry
    console.log(entry);

    // Luodaan kortti
    const card = document.createElement('div');
    card.classList.add('card');
    // Näytetään käyttäjän id kortissa
    card.innerHTML = `<span>${entry.user_id}</span>`;
    // Luodaan sisältö merkinnälle
    const cardDiary = document.createElement('div');
    cardDiary.innerHTML = `
      <p><strong>Date:</strong> ${entry.entry_date}</p>
      <p><strong>Mood:</strong> ${entry.mood}</p>
      <p><strong>Weight:</strong> ${entry.weight} kg</p>
      <p><strong>Sleep:</strong> ${entry.sleep_hours} hours</p>
      <p><strong>Notes:</strong> ${entry.notes}</p>
      `;

  /////////////////////////
  // Dialogin avausnappi
  /////////////////////////

    // Tähän tehdään dialogin avaus
    const openCard = document.createElement('button');
    openCard.classList.add('dialogButton');
    openCard.textContent = 'Open in dialog';

    // Lisätään napille kuuntelija
    openCard.addEventListener('click', () => {
      // Avataan dialogi
      dialog.showModal();
      // Tallennetaan entry id dialogin datasettiin
      dialog.dataset.entryId = entry.entry_id;
      // Näytetään ID dialogissa
      dialog.querySelector('.diary_id').textContent =
        `ID: ${entry.entry_id}`;
    });

    // Lisätään sisältö korttiin
    card.appendChild(cardDiary);
    card.appendChild(openCard);
    // Lisätään kortti sivulle
    diaryContainer.appendChild(card);
  });
};

///////////////////////////
// Uuden merkinnän lisäys
///////////////////////////

const addEntry = async ({ entry_date, mood, weight, sleep_hours, notes }) => {
  const url = 'http://localhost:3000/api/entries';

  // Haetaan token localStoragesta
  const token = localStorage.getItem('token');
  // Headerit API-kutsulle
  const headers = {
    'Content-Type': 'application/json',
    // Lisätään Authorization header vain jos token löytyy
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  // Muodostetaan body JSON-muotoon
  const body = JSON.stringify({ entry_date, mood, weight, sleep_hours, notes });

  try {
    // Lähetetään POST-pyyntö palvelimelle
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: body,
    });

    const data = await response.json();

    // Virheenkäsittely
    if (!response.ok) {
      console.error('Error adding entry:', data);
      return { error: data.error || "Unknown error" };
    }

    console.log('Entry added:', data);
    // Palautetaan backendin vastaus
    return data; // sisältää mm. entry_id ja message
  } catch (err) {
    console.error('Network or fetch error:', err);
    return { error: err.message };
  }
};

/////////////////////
// Merkinnän poisto
/////////////////////

const deleteEntry = async (entryId) => {
  // API endpoint poistolle
  const url = `http://localhost:3000/api/entries/${entryId}`;
  // Haetaan token localstoragesta
  const token = localStorage.getItem('token');
  // Authorization header
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  // Lähetetään DELETE-pyyntö
  const response = await fetch(url, {
    method: 'DELETE',
    headers: headers,
  });

  const data = await response.json();

  // Virheenkäsittely
  if (!response.ok) {
    console.error('Error deleting entry:', data);
    return { error: data.error || data.message || 'Unknown error' };
  }

  console.log('Entry deleted:', data.message);
  return data;
};

// Exportataan funktiot muihin tiedostoihin
export { getEntries, addEntry, deleteEntry };
