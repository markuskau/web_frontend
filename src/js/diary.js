// Tuodaan sovelluksessa käytettävät css-tyylit
import '../css/style.css'
import '../css/mobile.css';
import '../css/diary-card.css'

// Tässä on hyödynnetty tekoälyä osaan koodeista, mutta koodit kirjoitettu itse ja tarkistettu ymmärretäviksi, sekä katsottu että vastaa kurssin materiaaleja.

// Tuodaan entries.js tiedostosta funktiot, joilla haetaan, lisätään ja poistetaan päiväkirjamerkintöjä
import { getEntries, addEntry, deleteEntry } from './entries.js'

// Haetaan "Get entries" -nappi ja lisätään siihen klikkaustapahtuma
const getEntriesBtn = document.querySelector('.get_entries');
getEntriesBtn.addEventListener('click', getEntries);

// Haetaan "Add entries" -nappi
const addEntriesBtn = document.querySelector('.add_entries');

// Haetaan dialogi, jossa uusi merkintä lisätään
const addDialog = document.querySelector('.add_entry_dialog');
// Haetaan dialgin close- ja add-napit
const closeAddDialogBtn = document.getElementById('closeAddDialogBtn');
const addEntryDialogBtn = document.getElementById('addEntryDialogBtn');

// Avaa dialogi kun "Add entries" -nappia klikataan
addEntriesBtn.addEventListener('click', () => {
  addDialog.showModal();
});

// Sulje dialogi Close-napilla
closeAddDialogBtn.addEventListener('click', () => {
  addDialog.close();
});

// Add-nappi dialogissa
// Tämä kerää käyttäjän syöttämät tiedot ja lähettää ne palvelimelle
addEntryDialogBtn.addEventListener('click', async () => {
  // Haetaan input-kenttien arvot
  const entry_date = document.getElementById('entryDate').value;
  const mood = document.getElementById('mood').value;
  const weight = document.getElementById('weight').value;
  const sleep_hours = document.getElementById('sleepHours').value;
  const notes = document.getElementById('notes').value;


   // Tarkitetaan että pakolliset kentät on täytetty
   if (!entry_date) {
      alert('Date is required.');
      return;
    }

    if (!mood) {
      alert('Mood is required.');
      return;
    }

    if (!weight) {
      alert('Weight is required.');
      return;
    }

    if (!sleep_hours) {
      alert('Sleep is required.');
      return;
    }

  // Lähetetään merkintä palvelimelle addEntry-funktion avulla
  const result = await addEntry({ entry_date, mood, weight, sleep_hours, notes });

  // Tarkistetaan onnistuiko lisäys
  if (result.error) {
    // Näytetään virheimoitus jos lisäys epäonnistui
    alert('Error adding entry: ' + result.error);
  } else {
    // Ilmoitetaan onnistuneesta lisäyksestä
    alert('Entry added successfully! ID: ' + result.entry_id);
    // Suljetaan dialogi
    addDialog.close();

    // Tyhjennä input-kentät
    document.getElementById('entryDate').value = '';
    document.getElementById('mood').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('sleepHours').value = '';
    document.getElementById('notes').value = '';

    // Päivitetään näkymä hakemalla merkinnät uudelleen
    getEntries();
  }
});

// Haetaan dialogi, joka näyttää yksittäisen päiväkirjamerkinnän
const diaryDialog = document.querySelector('.diary_dialog');
// Haetaan delete -nappi
const deleteEntryBtn = document.getElementById('deleteEntryBtn');

// Suljetaan merkinnän dialogi
closeEntryBtn.addEventListener("click", () => {
  diaryDialog.close();
});

// Delete-napin toiminnallisuus
deleteEntryBtn.addEventListener("click", async () => {
  // Haetaan merkinnän ID dialogin datasetistä
  const entryId = diaryDialog.dataset.entryId;
  // Jos ID:tä ei ole, lopetetaan toiminto
  if (!entryId) return;

  // Jos ID löytyy,
  // Varmistetaan käyttäjältä merkinnän poisto
  if (confirm('Are you sure you want to delete this entry?')) {
    // Kutsutaan deleteEntry-funktiota joka poistaa merkinnän palvelimelta
    const result = await deleteEntry(entryId);
    // Tarkistetaan onnistuiko poisto
    if (!result.error) {
      alert('The entry was successfully removed!');
      // Suljetaan dialogi
      diaryDialog.close();
      // Päivitetään lista
      getEntries();
    } else {
      // Virheilmoitus jos poisto epäonnistui
      alert('Entry delete failed: ' + result.error);
    }
  }
});


