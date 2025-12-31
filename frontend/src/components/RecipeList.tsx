'use client'
import { useQuery } from "@apollo/client/react";
import { GET_RECIPES } from "../graphql/queries";
import { Recipe } from "../app/types";

import RecipeCard from "./RecipeCard";

type RecipesQuery = {
    recipes: Recipe[]
}

const RecipeList = () => {
    const { data } = useQuery<RecipesQuery>(GET_RECIPES)
    console.log(data, "this")
    return(
        <>
            {data ? data.recipes.map((recipe) => (
                <RecipeCard key={recipe.id} {...recipe}/>
            )) : null}
        </>
    )
}

export default RecipeList