'use client'
import React from "react"
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_RECIPES } from "../graphql/queries";
import { UPDATE_RECIPE } from "../graphql/mutations";
import RecipeList from "../components/RecipeList";
import { RecipesQuery } from "./types";

const Home = () => {
  const { data } = useQuery<RecipesQuery>(GET_RECIPES)
  const [updateRecipe, { data: updatedData }] = useMutation(UPDATE_RECIPE, {
    refetchQueries: ['GetRecipes']
  })
  const handleUpdate = async (recipeId) => {
    console.log(recipeId,"id")
    await updateRecipe({ 
      variables: { 
        id: recipeId,
        input: {
          title: "hi"
        }
      }
    })
  }
  return (
    <div>
      {data ? <RecipeList recipes={data.recipes}/> : null}
    </div>
  );
}

export default Home