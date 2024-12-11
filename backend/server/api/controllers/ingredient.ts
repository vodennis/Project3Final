import Container from "typedi";
import IngredientService from "../services/ingredient";
import { Request } from "express";
import { Response } from "express";

export default {
  async getIngredients(req: Request, res: Response) {
    try {
      console.log("RUNNING CONTROLLER FUNCTION");
      const ingredientService = Container.get(IngredientService);
      console.log("FIRST CONTAINER PASSED")
      const result = await ingredientService.getIngredients();
      console.log("SECOND CONTAINER PASSED")
      console.log(result);
      res.status(200).json({ result });
    } catch (e) {
      console.log(e);
    }
  },
};
