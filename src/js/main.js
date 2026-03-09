// Tuodaan css-tyylit
import '../css/style.css'
import '../css/mobile.css';
// Tuodaan fetchData-funktio, jota käytetään API-kutsuihin
import { fetchData } from './fetch.js';

// Tässä on hyödynnetty tekoälyä osaan koodeista, mutta koodit kirjoitettu itse ja tarkistettu ymmärretäviksi, sekä katsottu että vastaa kurssin materiaaleja.

// Suoritetaan koodi kun HTML on latautunut
document.addEventListener('DOMContentLoaded', () => {
  // Haetaan käyttäjäalue ja sleep-widget DOM:sta
  const userArea = document.getElementById('user-area');
  const sleepWidget = document.querySelector('.widget-sleep');

  // haetaan käyttäjä localStoragesta
  const user = localStorage.getItem('name');

  // Tarkistetaan onko käyttäjä kirjautunut
  if (user && userArea) {
    // Näytetään käyttäjän nimi ja logout-linkki
    userArea.innerHTML = `
      <span>Hello, ${user} 👋</span>
      <a href="#" id="logout">Logout</a>
    `;

    // Logout toiminto
    document.getElementById('logout').addEventListener('click', () => {
      // Poistetaan käyttäjä localStoragesta
      localStorage.removeItem('name');
      // Poistetaan myös käyttäjän token localstoragesta
      localStorage.removeItem('token');

      // Tyhjennetään sleep-widget
      if (sleepWidget) {
        sleepWidget.innerHTML = '';
      }
      // ladataan sivu uudelleen
      location.reload();
    });
  }

  // Funktio joka laskee nukutun unen keskiarvon
  const getSleepAverage = async () => {
    // API-osoite josta merkinnät haetaan
    const url = 'http://localhost:3000/api/entries';
    // Header-objekti API-kutsua varten
    let headers = {};
    // Haetaan token localstoragesta
    const token = localStorage.getItem('token');
    // Jos token löytyy lisätään se Authorization headeriin
    if (token) {
      headers = { Authorization: `Bearer ${token}` };
    }
    // Haetaan päiväkirjamerkinnät palvelimelta
    const entries = await fetchData(url, { headers });
    // Lopetetaan toiminto jos dataa ei saatu
    if (!entries || entries.error) return;
    // Lasketaan kaikkien merkintöjen unen tuntien summa
    const totalSleep = entries.reduce(
      (sum, entry) => sum + Number(entry.sleep_hours),
      0
    );
    // Lasketaan keskiarvo ja pyöristetään yhteen desimaaliin
    const average = (totalSleep / entries.length).toFixed(1);

    // Näytetään keskiarvo sleep-widgetissä
    if (sleepWidget) {
      sleepWidget.innerHTML = `
        <h4>Sleep average:</h4>
        <div style="font-size: 28px; font-weight: bold;">
          ${average} h
        </div>
      `;
    }
  };

  // Lasketaan vain jos käyttäjä on kirjautunut
  if (user) getSleepAverage();
});





// Odotetaan että HTML-dokumentti on täysin ladattu ennen koodin suorittamista
document.addEventListener('DOMContentLoaded', () => {
  // Haetaan BMI-historia localstoragesta ja muutetaan se taulukoksi
  const history = JSON.parse(localStorage.getItem('bmiHistory')) || [];
  // Haetaan canvas-elementti ja sen piirto-konteksti kaavion piirtämistä varten
  const ctx = document.getElementById('bmiChartWidget').getContext('2d');
  // Luodaan uusi Chart.js kaavio
  new Chart(ctx, {
    type: 'line', // Määritetään kaavion tyypiksi viivakaavio
    data: {
      // Luodaan x-akselin otsikot
      labels: history.map((_, i) => `Value ${i + 1}`),
      datasets: [{
        label: 'BMI-value',
        data: history, // BMI-arvot localstoragesta
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3
      }]
    },
    // Kaavion asetukset
    options: { responsive: true }
  });
});



