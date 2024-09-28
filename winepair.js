// Wine Pairing JS
const apiKey = "4c0d9daab8f64b988bca334418651193"; // Replace 'YOUR_API_KEY' with your actual Spoonacular API key

function getWinePairing() {
  const food = document.getElementById("foodInput").value;
  const url = `https://api.spoonacular.com/food/wine/pairing?food=${food}&apiKey=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayWinePairing(data);
    })
    .catch((error) => console.error("Error fetching wine pairing:", error));
}

function displayWinePairing(data) {
  const resultDiv = document.getElementById("wineResult");
  if (data.pairedWines) {
    resultDiv.innerHTML = `<h3>Recommended Wines for ${
      document.getElementById("foodInput").value
    }:</h3>
        <p>${data.pairingText}</p>
        <ul>${data.pairedWines
          .map((wine) => `<li>${wine}</li>`)
          .join("")}</ul>`;
  } else {
    resultDiv.innerHTML =
      "<p>Sorry, no wine pairing was found for your food choice.</p>";
  }
}
