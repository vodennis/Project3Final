import ingredients from "../services/ingredients"

const getIngredients = async () => {
  const { result } = await ingredients.getAll();
  return result;
};

const IngredientStore = {
  getIngredients
}

export default IngredientStore