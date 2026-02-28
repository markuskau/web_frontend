import { fetchData } from "./fetch.js";

const diaryContainer = document.querySelector(".diary-card-area");

// Dialog
/////////////////////////////

const dialog = document.querySelector('.diary_dialog');
const closeButton = document.querySelector('.diary_dialog button');
 //"Close" button closes the dialog
closeButton.addEventListener('click', () => {
  dialog.close();
});

const getEntries = async (event) => {
  const url = "http://localhost:3000/api/entries";
  let headers = {};
  let token = localStorage.getItem("token");
  console.log(token);
  if (token) {
    headers = { Authorization: `Bearer ${token}` };
  }
  const options = {
    headers: headers,
  };

  const response = await fetchData(url, options);

  if (response.error) {
    console.error("Error login in:", response.error);
    return;
  }

  if (response.message) {
    console.log(response.message, "success");
  }

  console.log(response);

  // luodaan lennossa tarvittavat kortit
  diaryContainer.innerHTML = "";
  response.forEach((entry) => {
    // luodaan aina yksittäinen kortti per rivi eli entry
    console.log(entry);

    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<span>${entry.user_id}</span>`;

    const cardDiary = document.createElement("div");
    cardDiary.innerHTML = `
      <p><strong>Date:</strong> ${entry.entry_date}</p>
      <p><strong>Mood:</strong> ${entry.mood}</p>
      <p><strong>Weight:</strong> ${entry.weight} kg</p>
      <p><strong>Sleep:</strong> ${entry.sleep_hours} hours</p>
      <p><strong>Notes:</strong> ${entry.notes}</p>
      `;

    // Tähän tehdään dialogin avaus
    const openCard = document.createElement("button");
    openCard.classList.add("dialogButton");
    openCard.textContent = "Avaa Dialogissa";

    // Lisätään napille kuuntelija
    openCard.addEventListener('click', () => {
      dialog.showModal();
      dialog.querySelector('.diary_id').innerHTML =
      `<div>ID: <span>${entry.entry_id}</span></div>`;
    });

    card.appendChild(cardDiary);
    card.appendChild(openCard);
    diaryContainer.appendChild(card);
  });
};

export { getEntries };
