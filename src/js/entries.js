import { fetchData } from "./fetch.js";

const diaryContainer = document.querySelector(".diary-card-area");

// Dialog
/////////////////////////////

const dialog = document.querySelector(".diary_dialog");
const closeButton = document.querySelector(".diary_dialog button");
//"Close" button closes the dialog
closeButton.addEventListener("click", () => {
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
    openCard.addEventListener("click", () => {
      dialog.showModal();
      dialog.dataset.entryId = entry.entry_id;
      dialog.querySelector(".diary_id").textContent =
        `ID: ${entry.entry_id}`;
    });

    card.appendChild(cardDiary);
    card.appendChild(openCard);
    diaryContainer.appendChild(card);
  });
};

const addEntry = async ({ entry_date, mood, weight, sleep_hours, notes }) => {
  const url = "http://localhost:3000/api/entries";

  // Haetaan token localStoragesta
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const body = JSON.stringify({ entry_date, mood, weight, sleep_hours, notes });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error adding entry:", data);
      return { error: data.error || "Unknown error" };
    }

    console.log("Entry added:", data);
    return data; // sisältää mm. entry_id ja message
  } catch (err) {
    console.error("Network or fetch error:", err);
    return { error: err.message };
  }
};

const deleteEntry = async (entryId) => {
  const url = `http://localhost:3000/api/entries/${entryId}`;
  const token = localStorage.getItem("token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const response = await fetch(url, {
    method: "DELETE",
    headers: headers,
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Error deleting entry:", data);
    return { error: data.error || data.message || "Unknown error" };
  }

  console.log("Entry deleted:", data.message);
  return data;
};

export { getEntries, addEntry, deleteEntry };
