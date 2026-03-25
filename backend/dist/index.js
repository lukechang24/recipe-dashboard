import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import pool from "./db.js";
const typeDefs = `#graphql
  scalar Timestamp

  type Recipe {
    id: ID!
    title: String!
    ingredients: [RecipeIngredient!]!
    description: String
    instructions: String!
    category: Category!
    createdAt: Timestamp!
    updatedAt: Timestamp
  }

  type Category {
    id: ID!
    name: String!
    recipes: [Recipe!]!
  }

  type Ingredient {
    id: ID!
    name: String!
    recipes: [Recipe!]!
  }

  type RecipeIngredient {
    ingredient: Ingredient!
    quantity: String
  }

  type Query {
    ingredients: [Ingredient!]!
    ingredient(id: ID!): Ingredient
    recipes(categoryId: ID): [Recipe!]!
    recipe(id: ID!): Recipe
    category(id: ID!): Category!
    categories: [Category!]!
  }

  input AddRecipeInput {
    title: String!
    ingredients: [RecipeIngredientInput!]!
    description: String
    instructions: String!
    categoryId: ID!
  }

  input RecipeIngredientInput {
    ingredient: IngredientInput!
    quantity: String
  }

  input IngredientInput {
    name: String!
  }

  type AddRecipePayload {
    code: Int!
    success: Boolean!
    message: String!
    recipe: Recipe
  }

  input UpdateRecipeInput {
    title: String
    ingredients: [RecipeIngredientInput]
    description: String
    instructions: String
  }

  type UpdateRecipePayload {
    code: Int!
    success: Boolean!
    message: String!
    recipe: Recipe
  }

  type DeleteRecipePayload {
    code: Int!
    success: Boolean!
    message: String!
    recipe: Recipe
  }

  type Mutation {
    addRecipe(input: AddRecipeInput): AddRecipePayload!
    updateRecipe(id: ID!, input: UpdateRecipeInput!): UpdateRecipePayload!
    deleteRecipe(id: ID!) : DeleteRecipePayload!
  }
`;
const resolvers = {
    Query: {
        recipes: async (_, { categoryId }) => {
            try {
                if (categoryId) {
                    const res = await pool.query(`
           SELECT title, description, id, created_at AS "createdAt", updated_at AS "updatedAt" from recipes
           WHERE category_id = $1
           `, [categoryId]);
                    return res.rows;
                }
                else {
                    const res = await pool.query(`
           SELECT title, description, id, created_at AS "createdAt", updated_at AS "updatedAt" from recipes
           `);
                    return res.rows;
                }
            }
            catch (error) {
                console.log(error);
                throw new Error("failed to fetch recipes");
            }
        },
        ingredients: async () => {
            try {
                const res = await pool.query(`
          SELECT id, name from ingredients
          `);
                return res.rows;
            }
            catch (error) {
                console.log(error);
                throw new Error("failed to fetch ingredients");
            }
        },
        recipe: async (_, { id }) => {
            try {
                const res = await pool.query(`
          SELECT *, created_at AS "createdAt", updated_at AS "updatedAt" from recipes
          WHERE id = $1
          `, [id]);
                return res.rows[0];
            }
            catch (error) {
                console.log(error);
                throw new Error('failed to fetch recipe');
            }
        },
        ingredient: async (_, { id }) => {
            try {
                const res = await pool.query(`
          SELECT id, name from ingredients
          WHERE id = $1  
          `, [id]);
                return res.rows[0];
            }
            catch (error) {
                console.log(error);
                throw new Error("failed to fetch ingredient");
            }
        },
        category: async (_, { id }) => {
            const res = await pool.query(`SELECT * FROM categories WHERE id = $1`, [id]);
            return res.rows[0];
        },
        categories: async () => {
            const res = await pool.query(`
        SELECT id, name FROM categories
      `);
            return res.rows;
        }
    },
    Mutation: {
        addRecipe: async (_, { input }) => {
            const client = await pool.connect();
            try {
                await client.query('BEGIN');
                console.log("running");
                const { title, description, instructions, ingredients, categoryId } = input;
                console.log(categoryId);
                // 1️⃣ Insert recipe
                const recipeRes = await client.query(`
          INSERT INTO recipes (title, description, instructions, category_id)
          VALUES ($1, $2, $3, $4)
          RETURNING id, title
          `, [title, description, instructions, categoryId]);
                const recipeId = recipeRes.rows[0].id;
                // 2️⃣ Handle ingredients
                for (const item of ingredients) {
                    const { name } = item.ingredient;
                    const { quantity } = item;
                    // Insert or fetch ingredient
                    const ingredientRes = await client.query(`
            INSERT INTO ingredients (name)
            VALUES ($1)
            ON CONFLICT (name) DO UPDATE
            SET name = EXCLUDED.name
            RETURNING id
            `, [name]);
                    const ingredientId = ingredientRes.rows[0].id;
                    // Join table insert
                    await client.query(`
            INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity)
            VALUES ($1, $2, $3)
            `, [recipeId, ingredientId, quantity]);
                }
                await client.query('COMMIT');
                return {
                    code: 200,
                    success: true,
                    message: 'Recipe added successfully',
                    recipe: recipeRes.rows[0]
                };
            }
            catch (err) {
                await client.query('ROLLBACK');
                throw new Error('Failed to add recipe');
            }
            finally {
                client.release();
            }
        },
        updateRecipe: async (_, { id, input }) => {
            const res = await pool.query(`
        UPDATE recipes
        SET title = $1
        WHERE id = $2
        RETURNING *
        `, [input.title, id]);
            if (res.rows.length > 0) {
                return {
                    code: 200,
                    success: true,
                    message: "Recipe updated successfully",
                    recipe: res.rows[0]
                };
            }
            else {
                return null;
            }
        },
        deleteRecipe: async (_, { id }) => {
            try {
                const res = await pool.query(`
          DELETE FROM recipes
          WHERE id = $1
          RETURNING *
          `, [id]);
                if (res.rows.length > 0) {
                    return {
                        code: 200,
                        success: true,
                        message: "Recipe successfully deleted",
                        recipe: res.rows[0]
                    };
                }
                else {
                    return null;
                }
            }
            catch (error) {
                console.log(error);
                throw new Error("failed to delete recipe");
            }
        }
    },
    Recipe: {
        ingredients: async (parent) => {
            try {
                const { id } = parent;
                const res = await pool.query(`
          SELECT i.id, i.name, ri.quantity FROM recipe_ingredients ri
          JOIN ingredients i ON i.id = ri.ingredient_id
          WHERE ri.recipe_id = $1
          `, [id]);
                return res.rows.map(row => ({
                    quantity: row.quantity,
                    ingredient: {
                        id: row.id,
                        name: row.name,
                    }
                }));
            }
            catch (error) {
                console.log(error);
                throw new Error("failed to fetch ingredient's recipes");
            }
        },
        category: async (parent) => {
            try {
                const { category_id } = parent;
                const res = await pool.query(`
          SELECT name from categories
          WHERE id = $1
          `, [category_id]);
                return res.rows[0];
            }
            catch (error) {
                console.log(error);
                throw new Error("failed to fetch recipes category");
            }
        }
    },
    Ingredient: {
        recipes: async ({ id }) => {
            const res = await pool.query(`
        SELECT r.id, r.title FROM recipe_ingredients ri
        JOIN recipes r ON r.id = ri.recipe_id
        WHERE ri.ingredient_id = $1
        `, [id]);
            return res.rows;
        }
    },
    Category: {
        recipes: async (parent) => {
            const res = await pool.query(`
        SELECT id, title FROM recipes
        WHERE category_id = $1
        `, [parent.id]);
            return res.rows;
        }
    }
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
