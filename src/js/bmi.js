import '../css/bmi.css';
// Tässä koodissa hyödynnetty tekoälyä, mutta koodi kirjoitettu itse ja ymmärrettävästi


// Lasketaan painoindeksi
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

  clearActive();

  let analysis = "";

  // Tarkastetaan painoindeksin arvo ja valitaan arvoa vastaava analyysi
  if (bmi < 19) {
    document.getElementById('low').classList.add('active');
    analysis = "Painoindeksisi on matala. Tämä voi viitata alipainoon.";
  } else if (bmi < 25) {
    document.getElementById('normal').classList.add('active');
    analysis =
      "Normaaliksi on valittu painoindeksin alue, jossa ihmisen terveys on parhaimmillaan. Normaali painoindeksin alue on välillä 18,5-25. Jos painoindeksi on pienenmpi kuin 18,5 tai suurempi kuin 25, sairauksien vaara suurenee. Painoindeksiä voidaan käyttää 18 vuoden iästä lähtien";
  } else {
    document.getElementById('high').classList.add('active');
    analysis = "Painoindeksisi on korkea. Ylipaino lisää sairauksien riskiä.";
  }

  // Näytetään analyysi käyttöliittymässä
  document.getElementById("analysisText").textContent = analysis;
};

// Poistaa aktiivisen luokan kaikista painoindeksiluokista
function clearActive() {
  document.getElementById('low').classList.remove('active');
  document.getElementById('normal').classList.remove('active');
  document.getElementById('high').classList.remove('active');
}
