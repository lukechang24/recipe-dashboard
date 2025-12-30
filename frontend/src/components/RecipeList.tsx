import React from "react"
import { RecipesQuery } from "../app/types"

const RecipeList: React.FC<RecipesQuery> = ({ recipes }) => {

    return(
        recipes.map(recipe => {
            return recipe.title
        })
    )
}

export default RecipeList