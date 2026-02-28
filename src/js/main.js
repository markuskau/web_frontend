import '/src/css/style.css'
import '../css/mobile.css';


document.addEventListener("DOMContentLoaded", () => {
  const userArea = document.getElementById("user-area");

  // haetaan käyttäjä localStoragesta ja muutetaan objektiksi
  const user = localStorage.getItem("name");

  // Tarkistetaan onko käyttäjä kirjautunut
  if (user && userArea) {
    // Näytetään nimi ja logout
    userArea.innerHTML = `
      <span>Hei, ${user} 👋</span>
      <a href="#" id="logout">Kirjaudu ulos</a>
    `;

    // Logout
    document.getElementById("logout").addEventListener("click", () => {
      localStorage.removeItem("name");
      location.reload();
    });
  }
});


// Tekoäly kokeilu
const sleepWidget = document.querySelector(".widget.workout");

const getSleepAverage = async () => {
  const url = "http://localhost:3000/api/entries";

  let headers = {};
  const token = localStorage.getItem("token");

  if (token) {
    headers = { Authorization: `Bearer ${token}` };
  }

  const entries = await fetchData(url, { headers });

  if (!entries || entries.error) return;

  // 🎯 Lasketaan keskiarvo
  const totalSleep = entries.reduce(
    (sum, entry) => sum + Number(entry.sleep_hours),
    0
  );

  const average = (totalSleep / entries.length).toFixed(1);

  // Näytetään widgetissä
  sleepWidget.innerHTML = `
    <h4>Nukutun unen keskiarvo</h4>
    <div style="font-size: 28px; font-weight: bold;">
      ${average} h
    </div>
  `;
};

getSleepAverage();
