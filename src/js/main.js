import '/src/css/style.css'
import '../css/mobile.css';


// Tekoälyllä tuotettu harjoitus kirjautumis sivusta
const userArea = document.getElementById("user-area");

// haetaan käyttäjä localStoragesta ja muutetaan ne objektiksi
const user = JSON.parse(localStorage.getItem("user"));

// Tarkistetaan onko käyttäjä kirjautunut
if (user) {
  // Näytetään kirjautuneen käyttäjän nimi ja uloskirjautumislinkki
  userArea.innerHTML = `
    <span>Hei, ${user.name} 👋</span>
    <a href="#" id="logout">Logout</a>
  `;

  // Lisätään EventListener uloskirjautumiselle
  document.getElementById("logout").addEventListener("click", () => {
    // Poistetaan käyttäjän tiedot localStoragesta
    localStorage.removeItem("user");
    // Päivitetään sivu
    location.reload();
  });
}

