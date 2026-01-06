'use client'
import React, { useState } from "react"
import { useMutation } from "@apollo/client/react"
import { ADD_RECIPE } from "../../graphql/mutations"

import * as S from "./index"

type IngredientInput = {
    quantity: string
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

const RecipeForm = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [instructions, setInstructions] = useState("")
    const [ingredients, setIngredients] = useState<IngredientInput[]>([{quantity: "", ingredient: {name: ""}}])
    // const [ingredients, setIngredients] = useState<IngredientInput[]>([{ quantity: "5g", ingredient: { name: "salt" } }])

    const [addRecipe] = useMutation(ADD_RECIPE, {
        onCompleted: (data) => {
            console.log("recipe added", data)
        },
        refetchQueries: ["GetRecipes"]
    }) 

    const handleForm = (e: React.FormEvent) => {
        e.preventDefault()
        if (!title.trim()) {
            alert("Title is required")
            return
        }

        if (ingredients.length === 0) {
            alert("At least one ingredient is required")
            return
        }

        for (const i of ingredients) {
            if (!i.ingredient.name.trim()) {
            alert("All ingredients need a name and quantity")
            return
            }
        }
        const input = {
            title,
            description,
            instructions,
            ingredients
        }
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
            <S.IngredientSection>
                Ingredients: 
                {
                    ingredients.map((ing, index) => {
                        return(
                            <S.IngredientContainer key={index}>
                                <input
                                    placeholder="Ingredient"
                                    value={ing.ingredient.name}
                                    onChange={(e) => {
                                        const updated = [...ingredients]
                                        updated[index].ingredient.name = e.target.value
                                        setIngredients(updated)
                                    }}
                                    />

                                <input
                                    placeholder="Quantity"
                                    value={ing.quantity}
                                    onChange={(e) => {
                                        const updated = [...ingredients]
                                        updated[index].quantity = e.target.value
                                        setIngredients(updated)
                                    }}
                                />
                                <button type="button" onClick={() => {
                                setIngredients(ingredients.filter((_, i) => i !== index))
                                }}>
                                Remove
                                </button>
                            </S.IngredientContainer>
                        )
                    })
                }
            <button type="button" onClick={() => setIngredients([...ingredients, { quantity: "", ingredient: { name: "" } }])}>
                add
            </button>
            </S.IngredientSection>
            <button type="submit">Add Recipe</button>
        </S.RecipeForm>
    )
}

export default RecipeForm