'use client'
import React, { useState } from "react"
import { useMutation } from "@apollo/client/react"
import { ADD_RECIPE } from "../graphql/mutations"

type IngredientInput = {
    quantity: String
    ingredient: Ingredient
}

type Ingredient = {
    name: string
}

const RecipeForm = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [instructions, setInstructions] = useState("")
    const [ingredients, setIngredients] = useState<IngredientInput[]>([{ quantity: "5g", ingredient: { name: "salt" } }])

    const [addRecipe] = useMutation(ADD_RECIPE, {
        onCompleted: (data) => {
            console.log("recipe added", data)
        },
        refetchQueries: ["GetRecipes"]
    }) 

    const handleForm = (e: React.FormEvent) => {
        e.preventDefault()
        const input = {
            title,
            description,
            instructions,
            ingredients
        }
        console.log(input)
        addRecipe({ variables: { input } })
    }
    console.log(title)
    return(
        <form onSubmit={(e) => handleForm(e)}>
            <input value={title} onChange={(e) => setTitle(e.currentTarget.value)}></input>
            <input value={description} onChange={(e) => setDescription(e.currentTarget.value)}></input>
            <input value={instructions} onChange={(e) => setInstructions(e.currentTarget.value)}></input>
            {/* <input value={title} onChange={(e) => setTitle(e.currentTarget.value)}></input> */}
            <button type="submit">Add Recipe</button>
        </form>
    )
}

export default RecipeForm