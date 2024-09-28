document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("forumForm");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent default form submission

      const recipeName = document.getElementById("recipeName").value;
      const ingredients = document.getElementById("ingredients").value;
      const preparation = document.getElementById("preparation").value;
      const recipePhoto = document.getElementById("recipePhoto").files[0];

      const submission = {
        recipeName: recipeName,
        ingredients: ingredients,
        preparation: preparation,
        recipePhoto: recipePhoto ? URL.createObjectURL(recipePhoto) : null,
        timestamp: new Date().toISOString(),
      };

      let submissions =
        JSON.parse(localStorage.getItem("savedRecipes")) || [];
      submissions.push(submission);
      localStorage.setItem("forumReciepes", JSON.stringify(submissions));

      form.reset();

      // Create feedback message
      const feedback = document.createElement("div");
      feedback.className = "alert alert-success";
      feedback.setAttribute("role", "alert");
      feedback.textContent = "Recipe submitted successfully!";
      form.prepend(feedback); // Place the feedback at the top of the form

      // Remove the feedback message after a few seconds
      setTimeout(() => {
        feedback.remove();
      }, 4000);
    });
  } else {
    console.warn("Element with ID 'forumForm' not found.");
  }
});
