import { useGenerate } from "../../hooks/useGenerate";
import { useState, useEffect } from "react";
import RecipeStore from "../../store/recipe";
import "./Search.css";

export function Search() {
  const { selectedIngredients, availableRecipes, setAvailableRecipes } = useGenerate();
  const [expandedRecipe, setExpandedRecipe] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("Selected Ingredients:", selectedIngredients);
    console.log("Available Recipes:", availableRecipes);
  }, [selectedIngredients, availableRecipes]);

  const recipes = availableRecipes || {};

  const handleRecipeClick = (name: string) => {
    setExpandedRecipe((prev) => (prev === name ? null : name));
  };

  const handleLike = async (recipeName: string) => {
    const recipeId = (recipes[recipeName] as any).recipe_id;
    const newLikes = await RecipeStore.likeRecipe(recipeId);

    if (availableRecipes) {
      setAvailableRecipes({
        ...availableRecipes,
        [recipeName]: {
          ...availableRecipes[recipeName],
          likes: newLikes
        }
      });
    }
  };

  //Logic:
    // If no ingredients selected, show all recipes. If ingredients selected, show only those whose every ingredient is included.
    // Filter by recipe name
  const filteredRecipes = Object.entries(recipes).filter(([name, data]) => {
    const passesIngredientFilter = selectedIngredients.length === 0 ||
      data.ingredients.every(ingredient => selectedIngredients.includes(ingredient));

    const passesNameFilter = name.toLowerCase().includes(searchTerm.toLowerCase());

    return passesIngredientFilter && passesNameFilter;
  });

  return (
    <div className="search-page">

      {selectedIngredients.length <= 0 && <p>NO INGREDIENTS SELECTED</p>}

      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {filteredRecipes.length === 0 && (
        <p>No recipes were found. Try selecting more ingredients or searching a different name!</p>
      )}

      <div className="recipe-grid">
        {filteredRecipes.map(([name, data]) => {
          const { ingredients, steps, instructions, image_url, likes } = data;
          const isExpanded = expandedRecipe === name;

          return (
            <div className="recipe-card" key={name}>
              <div className="recipe-header" onClick={() => handleRecipeClick(name)}>
                <img
                  src={image_url}
                  alt={`${name} dish`}
                  className="recipe-image"
                />
                <h3 className="recipe-title">{name}</h3>
                <div className="like-container">
                  <span className="like-count">{likes} Likes</span>
                  <button
                    className="like-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(name);
                    }}
                  >
                    Like
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="recipe-details">
                  <p><strong>Steps:</strong> {steps}</p>
                  <p><strong>Instructions:</strong> {instructions}</p>
                  <ul>
                    {ingredients.map((ingredient: string) => (
                      <li key={ingredient}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Search;
