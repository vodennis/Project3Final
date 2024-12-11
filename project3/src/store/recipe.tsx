import recipeService from "../services/recipe";

const getRecipes = async () => {
  const data = await recipeService.getAll();
  return data.result;
};

const likeRecipe = async (id: number) => {
  return recipeService.likeRecipe(id);
};

const createRecipe = async (recipeData: {
  name: string,
  instructions: string,
  steps: string,
  ingredients: string[],
  image_url: string
}) => {
  return recipeService.create(recipeData);
};

const RecipeStore = {
  getRecipes,
  likeRecipe,
  createRecipe
};

export default RecipeStore;
