import { Pool } from "pg";
import Container, { Service } from "typedi";

@Service()
export default class IngredientService {
  constructor (){}
  async getIngredients() {
    const pool: Pool = Container.get("pool");
    const result = await pool.query("SELECT * FROM public.ingredients");
    return result.rows;
  }
}
