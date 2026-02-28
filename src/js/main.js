import '/src/css/style.css'
import '../css/mobile.css';

document.addEventListener("DOMContentLoaded", () => {
  const userArea = document.getElementById("user-area");

  // haetaan käyttäjä localStoragesta ja muutetaan objektiksi
  const user = JSON.parse(localStorage.getItem("user"));

  // Tarkistetaan onko käyttäjä kirjautunut
  if (user && userArea) {
    // Näytetään nimi ja logout
    userArea.innerHTML = `
      <span>Hei, ${user.name} 👋</span>
      <a href="#" id="logout">Kirjaudu ulos</a>
    `;

    // Logout
    document.getElementById("logout").addEventListener("click", () => {
      localStorage.removeItem("user");
      location.reload();
    });
  }
});
