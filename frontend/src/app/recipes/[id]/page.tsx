'use client'
import React from "react"
import { useParams } from 'next/navigation'

import { GET_RECIPE } from "../../../graphql/queries"
import { useQuery } from '@apollo/client/react'

import { Recipe } from "../../../app/types";

type RecipeQuery = {
    recipe: Recipe
}

const RecipePage = () => {
    const id = useParams().id
    const { loading, error, data } = useQuery<RecipeQuery>(GET_RECIPE, {
        variables: { id }
    })
    if (loading) return <p>loading</p>
    if (error) return <p>error</p>
    if (!data) return null
    return(
        <div>{data.recipe.title}</div>
    )
}

export default RecipePage