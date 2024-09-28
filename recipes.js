//using meal db as api to get random meal
//api key: ?
//api url: ?

//using spoonacular api
//api key: ?
//api url: ?

const recipesContainer = document.getElementById("recipesContainer");
const apiKey = ?;

document.addEventListener("DOMContentLoaded", async () => {
  for (let i = 0; i < 10; i++) {
  const options = { method: "GET" };
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php",
    options
  );
  const data = await resp.json();

  for (const meal of data.meals) {
    console.log(meal);
    const container = document.createElement("div");
    container.className = "card col-md-4 m-2";

    const header = document.createElement("h2");
    header.textContent = meal.strMeal;

    const image = document.createElement("img");
    image.src = meal.strMealThumb;
    image.alt = meal.strMeal;
    image.className = "card-img-top";

    const instructions = document.createElement("p");
    instructions.textContent = meal.strInstructions;
    instructions.className = "card-text";

    const winePairingButton = document.createElement("button");
    winePairingButton.textContent = "Wine Pairing";
    winePairingButton.className = "btn btn-secondary";
    winePairingButton.addEventListener("click", () =>
      getWinePairing(meal.strCategory, container)
    );

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save Recipe";
    saveButton.className = "btn btn-success";
    saveButton.addEventListener("click", () => saveRecipe(meal));

    container.appendChild(header);
    container.appendChild(image);
    container.appendChild(instructions);
    container.appendChild(winePairingButton);
    container.appendChild(saveButton);
    recipesContainer.appendChild(container);
  }
}});

function saveRecipe(meal) {
  let savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
  if (!savedRecipes.some((savedMeal) => savedMeal.idMeal === meal.idMeal)) {
    savedRecipes.push(meal);
    localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
    alert("Recipe saved successfully!");
  } else {
    alert("Recipe is already saved!");
  }
}

function getWinePairing(food, container) {
  const url = `https://api.spoonacular.com/food/wine/pairing?food=${food}&apiKey=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayWinePairing(data, container);
    })
    .catch((error) => {
      console.error("Error fetching wine pairing:", error);
      displayError(
        "Error fetching wine pairing. Please try again later.",
        container
      );
    });
}

function displayWinePairing(data, container) {
  const mealName = container.querySelector("h2").textContent;
  if (data && data.pairedWines && data.pairedWines.length > 0) {
    container.innerHTML += `
        <div class="alert alert-info mt-2">
            <h3>Recommended Wines for ${mealName}:</h3>
            <p>${data.pairingText}</p>
            <ul>${data.pairedWines
              .map((wine) => `<li>${wine}</li>`)
              .join("")}</ul>
        </div>`;
  } else {
    container.innerHTML +=
      "<div class='alert alert-warning mt-2'><p>Sorry, no wine pairing was found for your food choice.</p></div>";
  }
}

function displayError(message, container) {
  container.innerHTML += `<div class="alert alert-danger mt-2"><p>${message}</p></div>`;
}
