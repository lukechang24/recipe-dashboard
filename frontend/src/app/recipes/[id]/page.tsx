'use client'
import React from "react"
import { useParams, useRouter } from 'next/navigation'

import { GET_RECIPE } from "../../../graphql/queries"
import { useQuery, useMutation } from '@apollo/client/react'

import { Recipe } from "../../../app/types"

import * as S from "./index"
import { DELETE_RECIPE } from "@/src/graphql/mutations"

type RecipeQuery = {
    recipe: Recipe
}

const RecipePage = () => {
    const id = useParams().id
    const router = useRouter()
    const { loading: recipeLoading, error: recipeError, data } = useQuery<RecipeQuery>(GET_RECIPE, {
        variables: { id }
    })
    
    const [deleteRecipe, { loading: deletionLoading, error: deletionError }] = useMutation(DELETE_RECIPE)

    if (recipeLoading) return <p>loading</p>
    if (recipeError) return <p>error</p>
    if (!data) return null
    if (!data.recipe) return null
    const { title, description, instructions, ingredients, createdAt, updatedAt } = data.recipe
    const date = new Date(updatedAt ? updatedAt : createdAt).toDateString()
    
    const handleDelete = async () => {
        await deleteRecipe({ variables: { id } })
        console.log("deleted")
    }

    return(
        <S.RecipeContainer>
            <button onClick={() => router.push("/")}>back to all recipes</button>
            <S.RecipeTitle>{title}</S.RecipeTitle>
            <S.RecipeDate>{date}</S.RecipeDate>
            <S.RecipeDescription>{description}</S.RecipeDescription>
            <S.IngredientsSection>
                <S.IngredientsHeading>Ingredients: </S.IngredientsHeading>
                {ingredients.map(({quantity, ingredient}, i) => {
                    return(
                        <S.IngredientContainer key={i}>
                            <S.IngredientName>{ingredient.name} {quantity}</S.IngredientName>
                        </S.IngredientContainer>
                    )
                })}
            </S.IngredientsSection>
            <S.InstructionsSection>
                <S.InstructionsHeading>Instructions: </S.InstructionsHeading>
                <S.Instructions>{instructions}</S.Instructions>
            </S.InstructionsSection>
            <S.DeleteButton onClick={() => handleDelete()}>Delete Recipe</S.DeleteButton>
        </S.RecipeContainer>
    )
}

export default RecipePage