import { Request, Response, Router } from "express";
import ingredient from "./ingredient";
import recipe from "./recipe";

export default () => {
  const app = Router();

  ingredient(app)
  recipe(app)
  
  return app;
};


