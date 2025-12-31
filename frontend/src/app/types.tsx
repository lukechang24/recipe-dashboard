type RecipeListProps = {
  recipes: Recipe[]
}

type Recipe = {
    id: string
    title: string
    createdAt: Date
    description?: string | null
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

export type { RecipeListProps, Recipe }