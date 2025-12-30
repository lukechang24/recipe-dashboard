interface RecipesQuery {
  recipes: Recipe[]
}

interface Recipe {
    id: string
    title: string
    ingredients?: {
        quantity: string
        ingredient: {
            name: string
        }
    }
}

export type { RecipesQuery }