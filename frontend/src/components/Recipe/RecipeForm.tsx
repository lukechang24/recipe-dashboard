'use client'
import React, { useState } from "react"
import { useMutation } from "@apollo/client/react"
import { ADD_RECIPE } from "../../graphql/mutations"

import * as S from "./index"

type IngredientInput = {
    quantity: String
    ingredient: Ingredient
}

type Ingredient = {
    name: string
}

const formatIngredients = (ingredients: string) => {
    const res = ingredients.split(", ").map(ingredient => {
        const match = ingredient.match(/\(([^)]+)\)/)
        return {
            quantity: match ? match[1] : "",
            ingredient: {
                name: ingredient.split("(")[0].replace(/\s+$/, '')
            }
        }
    })
    return res
}
formatIngredients("garlic (3 cloves), sugar (5g), chicken (1 lb)")

const RecipeForm = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [instructions, setInstructions] = useState("")
    const [ingredients, setIngredients] = useState("")
    // const [ingredients, setIngredients] = useState<IngredientInput[]>([{ quantity: "5g", ingredient: { name: "salt" } }])

    const [addRecipe] = useMutation(ADD_RECIPE, {
        onCompleted: (data) => {
            console.log("recipe added", data)
        },
        refetchQueries: ["GetRecipes"]
    }) 

    const handleForm = (e: React.FormEvent) => {
        e.preventDefault()
        if (!ingredients) {
            return
        }
        const input = {
            title,
            description,
            instructions,
            ingredients: formatIngredients(ingredients)
        }
        console.log(input)
        addRecipe({ variables: { input } })
    }
    return(
        <S.RecipeForm onSubmit={(e) => handleForm(e)}>
            <S.RecipeInputContainer>
                Name of Recipe:
                <S.RecipeInput value={title} onChange={(e) => setTitle(e.currentTarget.value)}></S.RecipeInput>
            </S.RecipeInputContainer>
            <S.RecipeInputContainer>
                Description: 
                <S.RecipeInput value={description} onChange={(e) => setDescription(e.currentTarget.value)}></S.RecipeInput>
            </S.RecipeInputContainer>
            <S.RecipeInputContainer>
                Instructions: 
                <S.RecipeInput value={instructions} onChange={(e) => setInstructions(e.currentTarget.value)}></S.RecipeInput>
            </S.RecipeInputContainer>
            <S.RecipeInputContainer>
                Ingredients: 
                <S.RecipeInput value={ingredients} onChange={(e) => setIngredients(e.currentTarget.value)} placeholder="e.g. garlic (3 cloves), sugar (5g), chicken (1 lb)"></S.RecipeInput>
            </S.RecipeInputContainer>
            {/* <input value={title} onChange={(e) => setTitle(e.currentTarget.value)}></input> */}
            <button type="submit">Add Recipe</button>
        </S.RecipeForm>
    )
}

export default RecipeForm