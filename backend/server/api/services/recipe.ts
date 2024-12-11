import { Pool } from "pg";
import Container, { Service } from "typedi";

@Service()
export default class RecipeService {
  constructor() {}

  async getRecipes() {
    const pool: Pool = Container.get("pool");
    // Qualify the table with public schema
    const result = await pool.query(`
      SELECT recipe_id, name, steps, instructions, ingredients, image_url, likes
      FROM public.recipes
      ORDER BY recipe_id
    `);

    const recipesMap: Record<string, {
      recipe_id: number,
      ingredients: string[],
      steps: string,
      instructions: string,
      image_url: string,
      likes: number
    }> = {};

    for (const row of result.rows) {
      const parsedIngredients = Array.isArray(row.ingredients)
        ? row.ingredients.map((ing: string) => ing.trim())
        : [];

      recipesMap[row.name] = {
        recipe_id: row.recipe_id,
        ingredients: parsedIngredients,
        steps: row.steps,
        instructions: row.instructions,
        image_url: row.image_url,
        likes: row.likes
      };
    }

    return recipesMap;
  }

  async incrementLike(recipeId: number) {
    const pool: Pool = Container.get("pool");
    // Qualify the table
    await pool.query(`UPDATE public.recipes SET likes = likes + 1 WHERE recipe_id = $1`, [recipeId]);
    const updated = await pool.query(`SELECT likes FROM public.recipes WHERE recipe_id = $1`, [recipeId]);
    return updated.rows[0].likes;
  }

  async createRecipe({ name, instructions, steps, ingredients, image_url }: {
    name: string,
    instructions: string,
    steps: string,
    ingredients: string[],
    image_url: string
  }) {
    const pool: Pool = Container.get("pool");
    const result = await pool.query(
      `INSERT INTO public.recipes (name, instructions, steps, ingredients, image_url, likes)
       VALUES($1, $2, $3, $4, $5, 0) RETURNING *`,
      [name, instructions, steps, ingredients, image_url]
    );
    return result.rows[0];
  }
}
