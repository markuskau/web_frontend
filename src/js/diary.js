import '../css/style.css'
import '../css/mobile.css';
import '../css/diary-card.css'


import { getEntries, addEntry, deleteEntry } from './entries.js'

const getEntriesBtn = document.querySelector('.get_entries');
getEntriesBtn.addEventListener('click', getEntries);


const addEntriesBtn = document.querySelector('.add_entries');


const addDialog = document.querySelector('.add_entry_dialog');
const closeAddDialogBtn = document.getElementById('closeAddDialogBtn');
const addEntryDialogBtn = document.getElementById('addEntryDialogBtn');

// Avaa dialogi
addEntriesBtn.addEventListener('click', () => {
  addDialog.showModal();
});

// Sulje dialogi Close-napilla
closeAddDialogBtn.addEventListener('click', () => {
  addDialog.close();
});

// Add-nappi dialogissa
addEntryDialogBtn.addEventListener('click', async () => {
  const entry_date = document.getElementById("entryDate").value;
  const mood = document.getElementById("mood").value;
  const weight = document.getElementById("weight").value;
  const sleep_hours = document.getElementById("sleepHours").value;
  const notes = document.getElementById("notes").value;

   if (!entry_date) {
      alert("Päivämäärä on pakollinen.");
      return;
    }

    if (!mood) {
      alert("Mieliala on pakollinen.");
      return;
    }

    if (!weight) {
      alert("Paino on pakollinen.");
      return;
    }

    if (!sleep_hours) {
      alert("Unet on pakollinen.");
      return;
    }


  const result = await addEntry({ entry_date, mood, weight, sleep_hours, notes });

  if (result.error) {
    alert("Virhe lisättäessä merkintää: " + result.error);
  } else {
    alert("Merkintä lisätty onnistuneesti! ID: " + result.entry_id);
    addDialog.close();

    // Tyhjennä inputit
    document.getElementById("entryDate").value = "";
    document.getElementById("mood").value = "";
    document.getElementById("weight").value = "";
    document.getElementById("sleepHours").value = "";
    document.getElementById("notes").value = "";

    // Päivitä näkymä
    getEntries();
  }
});

const diaryDialog = document.querySelector(".diary_dialog");
const deleteEntryBtn = document.getElementById("deleteEntryBtn");

// Sulje dialogi
closeEntryBtn.addEventListener("click", () => {
  diaryDialog.close();
});

deleteEntryBtn.addEventListener("click", async () => {
  const entryId = diaryDialog.dataset.entryId; // haetaan ID datasetistä
  if (!entryId) return;

  if (confirm("Haluatko varmasti poistaa tämän merkinnän?")) {
    const result = await deleteEntry(entryId); // calls entries.js DELETE-funktio
    if (!result.error) {
      alert("Merkintä poistettu onnistuneesti!");
      diaryDialog.close();
      getEntries(); // päivitä lista näkymään
    } else {
      alert("Poisto epäonnistui: " + result.error);
    }
  }
});


