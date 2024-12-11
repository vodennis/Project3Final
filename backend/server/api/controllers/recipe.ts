import Container from "typedi";
import RecipeService from "../services/recipe";
import { Request, Response } from "express";

export default {
  async getRecipes(req: Request, res: Response) {
    try {
      const recipeService = Container.get(RecipeService);
      const result = await recipeService.getRecipes();
      res.status(200).json({ result });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: "Server error" });
    }
  },

  async incrementLike(req: Request, res: Response) {
    try {
      const recipeService = Container.get(RecipeService);
      const recipeId = parseInt(req.params.id, 10);
      const newLikes = await recipeService.incrementLike(recipeId);
      res.status(200).json({ likes: newLikes });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: "Server error" });
    }
  },

  async createRecipe(req: Request, res: Response) {
    try {
      const { name, instructions, steps, ingredients, image_url } = req.body;
      const recipeService = Container.get(RecipeService);
      const newRecipe = await recipeService.createRecipe({
        name,
        instructions,
        steps,
        ingredients,
        image_url
      });
      res.status(201).json({ result: newRecipe });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: "Server error" });
    }
  },
};
