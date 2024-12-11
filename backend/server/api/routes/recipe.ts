import { Router } from "express";
import controllers from "../controllers";

const route = Router();

export default (app: Router) => {
  app.use("/recipes", route);

  route.get("/", controllers.recipe.getRecipes);
  route.post("/:id/like", controllers.recipe.incrementLike);
  route.post("/", controllers.recipe.createRecipe);
};
