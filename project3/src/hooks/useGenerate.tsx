import { useEffect, useState } from "react";
import IngredientStore from "../store/ingredient";
import RecipeStore from "../store/recipe";

export function useGenerate() {
  
  const getInitialIngredients = () => {
    const saved = localStorage.getItem('selectedIngredients');
    return saved ? JSON.parse(saved) : [];
  };

  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(getInitialIngredients());
  const [availableIngredients, setAvailableIngredients] = useState<string[]>();
  const [availableRecipes, setAvailableRecipes] = useState<Record<string, {
    recipe_id: number,
    ingredients: string[],
    steps: string,
    instructions: string,
    image_url: string,
    likes: number
  }>>();

  const resetClick = () => {
    localStorage.setItem('selectedIngredients', JSON.stringify([]));
    setSelectedIngredients([]);
  };

  const handleClick = (ingredient: string) => {
    if (!selectedIngredients) return setSelectedIngredients([ingredient]);
    if (selectedIngredients.includes(ingredient)) return;
    const newSelectedIngredients = [...selectedIngredients, ingredient];
    setSelectedIngredients(newSelectedIngredients);
  };

  const getIngredients = async () => {
    const data = await IngredientStore.getIngredients();
    const ingredients = data.map((ingredient: any) => ingredient.name);
    setAvailableIngredients(ingredients);
  };

  const getRecipes = async () => {
    const data = await RecipeStore.getRecipes();
    //data should be { "Spaghetti": {...}, "Pancakes": {...}, etc.}
    setAvailableRecipes(data);
  };

  useEffect(() => {
    localStorage.setItem('selectedIngredients', JSON.stringify(selectedIngredients));
  }, [selectedIngredients]);

  useEffect(() => {
    getIngredients();
    getRecipes();
  }, []);

  return {
    setAvailableIngredients,
    setAvailableRecipes,
    setSelectedIngredients,
    selectedIngredients,
    availableIngredients,
    availableRecipes,
    handleClick,
    resetClick
  };
}


//test code.
// import { useEffect, useState } from "react";
// import IngredientStore from "../store/ingredient";
// import RecipeStore from "../store/recipe";

// export function useGenerate() {
  
//   const getInitialIngredients = () => {
//     const saved = localStorage.getItem('selectedIngredients')
//     return saved ? JSON.parse(saved) : [];
//   } 

//   const [selectedIngredients, setSelectedIngredients] = useState<string[]>(getInitialIngredients());
//   const [availableIngredients, setAvailableIngredients] = useState<string[]>();

//   const [availableRecipes, setAvailableRecipes] = useState<Record<string, { ingredients: string[], steps: string, instructions: string }>>();

//   const resetClick = () => {
//     localStorage.setItem('selectedIngredients', JSON.stringify([]))
//     setSelectedIngredients([])
//   }
  
//   const handleClick = (ingredient: string) => {
//     if (!selectedIngredients) return setSelectedIngredients([ingredient]);

//     if (selectedIngredients.includes(ingredient)) return;

//     const newSelectedIngredients = [...selectedIngredients, ingredient];

//     setSelectedIngredients(newSelectedIngredients); //updating all of the already selected ingredients with the new ingredient
//   };

//   const getIngredients = async () => {
//     const data = await IngredientStore.getIngredients()
//     console.log(data, "THIS IS THE OBJECT OF DATA")
//     const ingredients = data.map((ingredient:any)=>{return ingredient.name})
//     console.log(ingredients)
//     setAvailableIngredients(ingredients);
//   }

//   const getRecipes = async () => {
//     const data = await RecipeStore.getRecipes()
//     const recipes = data.map((recipe:any)=>{return recipe.name})
//     console.log(recipes)
//     setAvailableRecipes(recipes);
//   }

//   //here useEffect 
//   useEffect(() => {
//     localStorage.setItem('selectedIngredients', JSON.stringify(selectedIngredients))
    
//   }, [selectedIngredients]
// )

//   useEffect(() => {
//     getIngredients()
//     getRecipes();
//   }, []);

//   return {
//     setAvailableIngredients,
//     setAvailableRecipes,
//     setSelectedIngredients,
//     selectedIngredients,
//     availableIngredients,
//     availableRecipes,
//     handleClick,
//     resetClick
//   };
// }
