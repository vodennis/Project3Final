require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function seed() {
  try {
    await pool.query('TRUNCATE TABLE recipe_ingredients RESTART IDENTITY CASCADE;');
    await pool.query('TRUNCATE TABLE recipes RESTART IDENTITY CASCADE;');
    await pool.query('TRUNCATE TABLE ingredients RESTART IDENTITY CASCADE;');

    await pool.query(`
      INSERT INTO ingredients (name) VALUES
      ('flour'), ('milk'), ('eggs'), ('sugar'), ('bread'), ('cheese'),
      ('butter'), ('garlic'), ('olive oil'), ('tomato sauce'), ('pasta'),
      ('beans'), ('chicken'), ('cucumbers'), ('vinegar'), ('lettuce'),
      ('chocolate chips'), ('water'), ('tomatoes')
    `);

    await pool.query(`
      INSERT INTO recipes (name, steps, instructions, ingredients, image_url, likes)
      VALUES
      ('Spaghetti',
        'Step 1: Boil water. Step 2: Cook pasta. Step 3: Prepare sauce.',
        'Bring a pot of water to a boil, cook the spaghetti until al dente, and prepare the tomato sauce in a separate pan.',
        '{"pasta","tomato sauce","olive oil","garlic"}',
        'https://veganwithgusto.com/wp-content/uploads/2021/05/spicy-spaghetti-arrabbiata.jpg',
        0
      ),
      ('Pancakes',
        'Step 1: Mix ingredients. Step 2: Cook on a hot pan.',
        'Combine flour, milk, eggs, and sugar in a bowl. Heat a pan and pour batter in small circles to cook.',
        '{"flour","milk","eggs","sugar"}',
        'https://www.tastesoflizzyt.com/wp-content/uploads/2023/12/sourdough-pancakes-23.jpg',
        0
      ),
      ('Garden Salad',
        'Step 1: Chop vegetables. Step 2: Mix in a bowl. Step 3: Add dressing.',
        'Chop lettuce, tomatoes, and cucumbers. Mix in a bowl and drizzle with olive oil and vinegar.',
        '{"lettuce","tomatoes","cucumbers","olive oil","vinegar"}',
        'https://garlicsaltandlime.com/wp-content/uploads/2022/07/Garden-salad-thumbnail.jpg',
        0
      ),
      ('Chocolate Chip Cookies',
        'Step 1: Prepare dough. Step 2: Bake in the oven.',
        'Mix flour, sugar, butter, and chocolate chips to prepare the dough. Shape into balls and bake at 375°F for 10-12 minutes.',
        '{"flour","sugar","butter","chocolate chips"}',
        'https://handletheheat.com/wp-content/uploads/2020/10/BAKERY-STYLE-CHOCOLATE-CHIP-COOKIES-9-637x637-1.jpg',
        0
      ),
      ('Grilled Cheese Sandwich',
        'Step 1: Assemble sandwich. Step 2: Grill on a pan.',
        'Place cheese between slices of bread. Butter the outside of the bread and grill on a pan until golden brown.',
        '{"bread","cheese","butter"}',
        'https://www.allrecipes.com/thmb/UVU9W8kTfADN7YjALIn1u9MfCUY=/0x512/filters:no_upscale():max_bytes(150000):strip_icc()/125434-GrilledCheeseoftheGods-mfs-3x2-067-267097af4d0b446ab646bba044445147.jpg',
        0
      );
    `);

    console.log("Database seeded successfully on Supabase.");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    await pool.end();
  }
}

seed();
