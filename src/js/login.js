// Tämä koodi tuotettu kokonaan tekoälyn avulla
import "../css/login.css";

const form = document.getElementById("login-form");
const usernameInput = document.getElementById("username");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = usernameInput.value;
  console.log("Syötetty nimi:", username);

  usernameInput.addEventListener('input', () => {
    console.log(usernameInput.value);
  });

  localStorage.setItem("user", JSON.stringify({ name: username }));

  window.location.href = "index.html";
});
