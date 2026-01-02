'use client'
import { useQuery } from "@apollo/client/react";
import { GET_RECIPES } from "../graphql/queries";
import { Recipe } from "../app/types";

import RecipeCard from "./RecipeCard";

type RecipesQuery = {
    recipes: Recipe[]
}

const RecipeList = () => {
    const { loading, error, data } = useQuery<RecipesQuery>(GET_RECIPES)
    if (loading) return <p>loading</p>
    if (error) return <p>error</p>
    if (!data) return null    
    return(
        <>
            {data.recipes.map((recipe) => (
                <RecipeCard key={recipe.id} {...recipe}/>
            ))}
        </>
    )
}

export default RecipeList