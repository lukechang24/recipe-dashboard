'use client'
import React, { useState } from "react"
import { useQuery } from "@apollo/client/react";
import { useMutation } from "@apollo/client/react"
import { ADD_RECIPE } from "../../graphql/mutations"
import { GET_CATEGORIES, GET_RECIPES } from "../../graphql/queries"
import { Categories } from "../../app/types";
import IngredientInput from "./IngredientInput"


import * as S from "./index"

type IngredientInput = {
    quantity: string
    ingredient: Ingredient
}

type Ingredient = {
    name: string
    id: string
}

type CategoriesQuery = {
    categories: [Categories]
}

type Props = {
    categories?: Categories[]
    showForm: any
    setShowForm: any
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

const RecipeForm = ({ categories, showForm, setShowForm } : Props) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [instructions, setInstructions] = useState("")
    const [categoryId, setCategoryId] = useState("1")
    const [ingredients, setIngredients] = useState<IngredientInput[]>([{quantity: "", ingredient: {name: "", id: ""}}])
    // const [ingredients, setIngredients] = useState<IngredientInput[]>([{ quantity: "5g", ingredient: { name: "salt" } }])
    const [addRecipe] = useMutation(ADD_RECIPE, {
        onCompleted: (data) => {
            console.log("recipe added", data)
        },
        refetchQueries: [GET_RECIPES, "GetRecipes"]
    }) 

    const updateIngredient = (index : number, updatedIng : IngredientInput) => {
        const updated = [...ingredients]
        updated[index] = updatedIng
        setIngredients(updated)
    }

    const removeIngredient = (index : number) => {
        setIngredients(ingredients.filter((_, i) => i !== index))
    }

    const validateForm = () => {
        if (!title.trim()) return "Title is required"
        if (!ingredients.length) return "At least one ingredient is required"
        for (const i of ingredients) {
            if (!i.ingredient.name.trim()) return "All ingredients need a name"
        }
        return null
    }

    const handleForm = (e: React.FormEvent) => {
        e.preventDefault()
        const error = validateForm()
        if(error) return alert(error)

        const input = {
            title,
            description,
            instructions,
            categoryId,
            ingredients
        }
        addRecipe({ variables: { input } })
        setShowForm(false)
    }
    return(
        <S.RecipeForm show={showForm} onSubmit={(e) => handleForm(e)}>
            <S.ExitButton type="button" onClick={() => setShowForm(false)}>x</S.ExitButton>
            <S.RecipeInputContainer>
                <S.InputTitle>Recipe Name: </S.InputTitle>
                <S.RecipeInput value={title} onChange={(e) => setTitle(e.currentTarget.value)}></S.RecipeInput>
            </S.RecipeInputContainer>
            <S.RecipeInputContainer>
                <S.InputTitle>Description: </S.InputTitle>
                <S.RecipeInput value={description} onChange={(e) => setDescription(e.currentTarget.value)}></S.RecipeInput>
            </S.RecipeInputContainer>
            <S.RecipeInputContainer>
                <S.InputTitle>Instructions: </S.InputTitle>
                <S.RecipeInput value={instructions} onChange={(e) => setInstructions(e.currentTarget.value)}></S.RecipeInput>
            </S.RecipeInputContainer>
            <S.RecipeInputContainer>
                <S.InputTitle>Recipe Category: </S.InputTitle>
                <S.CategoryDropdown value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                    {categories?.map(category => {
                        const { id, name } = category
                        return(
                            <S.Option key={id} value={category.id}>{name}</S.Option>
                        )
                    })}
                </S.CategoryDropdown>
            </S.RecipeInputContainer>
            <S.IngredientSection>
                <S.InputTitle>Ingredients: </S.InputTitle>
                {ingredients.map((ing, index, arr) => (
                <IngredientInput
                    key={index}
                    ing={ing}
                    index={index}
                    arrLen={arr.length}
                    updateIngredient={updateIngredient}
                    removeIngredient={removeIngredient}
                />
                ))}
                <S.AddIngredient type="button" onClick={() => setIngredients([...ingredients, { quantity: "", ingredient: { name: "", id: "" } }])}>+ Add Ingredient</S.AddIngredient>
            </S.IngredientSection>
            <S.AddRecipe type="submit">Add Recipe</S.AddRecipe>
        </S.RecipeForm>
    )
}

export default RecipeForm