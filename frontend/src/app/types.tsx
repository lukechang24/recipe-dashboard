type Recipe = {
    id: string
    title: string
    createdAt: string
    updatedAt?: string | null
    description?: string | null
    instructions: string
    ingredients: {
        quantity: string
        ingredient: Ingredient
    }[]
}

type Ingredient = {
    id: string
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

export type { Ingredient, Recipe }