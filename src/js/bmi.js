// Tuodaan BMI laskurin tyylitiedosto
import '../css/bmi.css'


// Tässä koodissa hyödynnetty tekoälyä, mutta koodi kirjoitettu itse ja ymmärrettävästi


// Funktio jossa lasketaan painoindeksi
window.calculateBMI = function () {
  const weight = Number(document.getElementById('weight').value);
  console.log('Weight:', weight);
  const height = Number(document.getElementById('height').value) / 100;
  console.log('Height:', height);

  // Lasketaan bmi
  const bmi = weight / (height * height);
  // Pyöristetään kahden desimaalin tarkkuudelle
  const roundedBMI = bmi.toFixed(1);
  // Näytetään laskettu BMI käyttöliittymässä ja konsolissa
  document.getElementById('bmiValue').textContent = roundedBMI;
  console.log('BMI value:', roundedBMI);


  // Haetaan aikaisempi BMI-historia localstoragesta
  let history = JSON.parse(localStorage.getItem('bmiHistory')) || [];
  // Lisätään uusi BMI-arvo historiaan
  history.push(bmi);
  // Tallennetaan päivitetty historia takaisin localstorageen
  localStorage.setItem('bmiHistory', JSON.stringify(history));

  // Poistetaan aktiivinen luokka kaikista BMI-luokista enne uuden lisäämistä.
  clearActive();

  // Muuttuja analyysitekstille
  let analysis = '';

  // Tarkastetaan painoindeksin arvo ja valitaan arvoa vastaava analyysi
  if (bmi < 19) {
    document.getElementById('low').classList.add('active');
    analysis = "Your body mass index is low. This may indicate that you are underweight.";
  } else if (bmi < 25) {
    document.getElementById('normal').classList.add('active');
    analysis =
      "The normal range of body mass index has been chosen as the range in which a person's health is at its best. The normal range of body mass index is between 18.5 and 25. If the body mass index is lower than 18.5 or higher than 25, the risk of diseases increases. The body mass index can be used from the age of 18.";
  } else {
    document.getElementById('high').classList.add('active');
    analysis = "Your body mass index is high. Being overweight increases the risk of diseases.";
  }

  // Näytetään analyysi käyttöliittymässä
  document.getElementById("analysisText").textContent = analysis;

};

// Poistaa aktiivisen luokan kaikista painoindeksiluokista
function clearActive() {
  document.getElementById('low').classList.remove('active');
  document.getElementById('normal').classList.remove('active');
  document.getElementById('high').classList.remove('active');
};
