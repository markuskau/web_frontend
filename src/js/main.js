import '/src/css/style.css'
import '../css/mobile.css';
import { fetchData } from './fetch.js';


document.addEventListener("DOMContentLoaded", () => {
  const userArea = document.getElementById("user-area");
  const sleepWidget = document.querySelector(".widget-sleep");

  // haetaan käyttäjä localStoragesta
  const user = localStorage.getItem("name");

  // Tarkistetaan onko käyttäjä kirjautunut
  if (user && userArea) {
    userArea.innerHTML = `
      <span>Hei, ${user} 👋</span>
      <a href="#" id="logout">Kirjaudu ulos</a>
    `;

    // Logout
    document.getElementById("logout").addEventListener("click", () => {
      // Poistetaan käyttäjä localStoragesta
      localStorage.removeItem("name");
      localStorage.removeItem("token"); // jos käytät tokenia myös logoutissa

      // Tyhjennetään widget
      if (sleepWidget) {
        sleepWidget.innerHTML = "";
      }

      location.reload();
    });
  }

  // Lasketaan unen keskiarvo
  const getSleepAverage = async () => {
    const url = "http://localhost:3000/api/entries";
    let headers = {};
    const token = localStorage.getItem("token");

    if (token) {
      headers = { Authorization: `Bearer ${token}` };
    }

    const entries = await fetchData(url, { headers });
    if (!entries || entries.error) return;

    const totalSleep = entries.reduce(
      (sum, entry) => sum + Number(entry.sleep_hours),
      0
    );

    const average = (totalSleep / entries.length).toFixed(1);

    // Näytetään widgetissä
    if (sleepWidget) {
      sleepWidget.innerHTML = `
        <h4>Nukutun unen keskiarvo</h4>
        <div style="font-size: 28px; font-weight: bold;">
          ${average} h
        </div>
      `;
    }
  };

  // Lasketaan vain jos käyttäjä on kirjautunut
  if (user) getSleepAverage();
});
