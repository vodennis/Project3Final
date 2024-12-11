import { Router } from "express";
import controllers from "../controllers";
const route = Router();

export default (app: Router) => {
  app.use("/ingredients", route);


  route.get("/", controllers.ingredient.getIngredients);

};
