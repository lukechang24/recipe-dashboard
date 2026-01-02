type RecipeListProps = {
  recipes: Recipe[]
}

type Recipe = {
    id: string
    title: string
    createdAt: Date
    updatedAt?: Date | null
    description?: string | null
    instructions: string
    ingredients: {
        quantity: string
        ingredient: Ingredient
    }
}

type Ingredient = {
    id?: string | null
    name: string
}
// interface Recipe {
//     id: string
//     title: string
//     description: string
//     ingredients?: {
//         quantity: string
//         ingredient: {
//             name: string
//         }
//     }
// }

export type { Ingredient, RecipeListProps, Recipe }