document.addEventListener("DOMContentLoaded", () => {
  const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
  const forumRecipes = JSON.parse(localStorage.getItem("forumReciepes")) || []; // Corrected key name
  const container = document.getElementById("savedRecipesContainer");
  savedRecipes.forEach((meal) => {
    const card = createRecipeCard(meal);
    container.appendChild(card);
  });

  forumRecipes.forEach((meal) => {
    const card = createRecipeCard2(meal);
    container.appendChild(card);
  });
});


function createRecipeCard(meal) {
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

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete Recipe";
  deleteButton.className = "btn btn-success";
  deleteButton.addEventListener("click", () => deleteRecipe(meal));

  container.appendChild(header);
  container.appendChild(image);
  container.appendChild(instructions);
  container.appendChild(deleteButton);
  return container;
}

function deleteRecipe(meal) {
  let savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
  savedRecipes = savedRecipes.filter((savedMeal) => savedMeal.idMeal !== meal.idMeal);
  localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
  location.reload();
}

function createRecipeCard2(meal) {
  const container = document.createElement("div");
  container.className = "card col-md-4 m-2";

  const header = document.createElement("h2");
  header.textContent = meal.recipeName;

  const image = document.createElement("img");
  if (meal.recipePhoto) {
    // Convert blob to URL
    const imageUrl = URL.createObjectURL(meal.recipePhoto);
    image.src = imageUrl;
  }
  image.alt = meal.recipeName;
  image.className = "card-img-top";

  const ingredients = document.createElement("p");
  ingredients.textContent = meal.ingredients;
  ingredients.className = "card-text";

  const preparation = document.createElement("p");
  preparation.textContent = meal.preparation;
  preparation.className = "card-text";

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete Recipe";
  deleteButton.className = "btn btn-success";
  deleteButton.addEventListener("click", () => deleteRecipe2(meal));

  container.appendChild(header);
  container.appendChild(image);
  container.appendChild(ingredients);
  container.appendChild(preparation);
  container.appendChild(deleteButton);
  return container;
}

function deleteRecipe2(meal) {
  let forumRecipes = JSON.parse(localStorage.getItem("forumRecipes")) || [];
  forumRecipes = forumRecipes.filter((savedMeal) => savedMeal.timestamp !== meal.timestamp);
  localStorage.setItem("forumRecipes", JSON.stringify(forumRecipes));
  location.reload();
}
