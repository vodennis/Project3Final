import { useNavigate } from "react-router-dom";
import { useGenerate } from "../../hooks/useGenerate";
import RecipeStore from "../../store/recipe";
import { useState } from "react";
import "./Generate.css";

type MapAvailableIngredientsProps = {
  availableIngredients: string[] | undefined,
  handleClick: (ingredient: string) => void
}

const MapAvailableIngredients = ({ availableIngredients, handleClick }: MapAvailableIngredientsProps) => (
  <div className="tags-section">
    {availableIngredients?.map((ingredient) => (
      <button
        className="tag-button"
        key={ingredient}
        onClick={() => {
          handleClick(ingredient);
        }}
      >
        {ingredient}
      </button>
    ))}
  </div>
);

export function Input() {
  const { resetClick, selectedIngredients, availableIngredients, handleClick, setAvailableRecipes } = useGenerate();
  const navigate = useNavigate();

  const [recipeName, setRecipeName] = useState("");
  const [recipeImage, setRecipeImage] = useState("");
  const [recipeInstructions, setRecipeInstructions] = useState("");
  const [recipeSteps, setRecipeSteps] = useState("");

  const handleSave = async () => {
    if (!recipeName.trim() || !recipeImage.trim()) {
      alert("Please provide a recipe name and image URL.");
      return;
    }
    if (selectedIngredients.length === 0) {
      alert("Please select at least one ingredient.");
      return;
    }

    const data = {
      name: recipeName,
      instructions: recipeInstructions || "No detailed instructions provided.",
      steps: recipeSteps || "No specific steps provided.",
      ingredients: selectedIngredients,
      image_url: recipeImage
    };

    const newRecipe = await RecipeStore.createRecipe(data);

    // Update the availableRecipes state so the new recipe appears on the search page
    setAvailableRecipes(prev => ({
      ...(prev || {}),
      [newRecipe.name]: {
        recipe_id: newRecipe.recipe_id,
        ingredients: newRecipe.ingredients,
        steps: newRecipe.steps,
        instructions: newRecipe.instructions,
        image_url: newRecipe.image_url,
        likes: newRecipe.likes
      }
    }));

    alert(`Recipe '${newRecipe.name}' saved successfully! You can find it on the search page now.`);
  };

  return (
    <div className="generate-page">
      <h2>Generate a Custom Recipe</h2>
      <p>Pick your ingredients, name your recipe, add an image, and save it!</p>
      
      <div className="generate-form">
        <input
          type="text"
          placeholder="Recipe Name"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={recipeImage}
          onChange={(e) => setRecipeImage(e.target.value)}
        />
        <textarea
          placeholder="Instructions (optional)"
          value={recipeInstructions}
          onChange={(e) => setRecipeInstructions(e.target.value)}
        />
        <textarea
          placeholder="Steps (optional)"
          value={recipeSteps}
          onChange={(e) => setRecipeSteps(e.target.value)}
        />
      </div>

      <h3>Available Ingredients:</h3>
      <MapAvailableIngredients availableIngredients={availableIngredients} handleClick={handleClick} />

      {selectedIngredients.length > 0 && (
        <>
          <h4>Selected Ingredients:</h4>
          <div className="selected-ingredients">
            {selectedIngredients.map((ing) => <p key={ing}>{ing}</p>)}
          </div>
        </>
      )}

      <div className="button-container">
        <button onClick={handleSave}>Save Recipe</button>
        <button onClick={() => navigate("/search")}>Go to Search</button>
        <button onClick={resetClick}>Reset Selected Ingredients</button>
      </div>
    </div>
  );
}
