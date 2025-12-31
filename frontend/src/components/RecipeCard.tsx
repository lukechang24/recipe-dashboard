import React from "react"
import { Recipe } from "../app/types"

type RecipeCardProps = Recipe

const RecipeCard: React.FC<RecipeCardProps> = ({ id, title, createdAt, description }) => {
    const dateObj = new Date(createdAt)
    return(
        <div>
            <h1>{title}</h1>
            <p>{dateObj.toDateString()}</p>
            <p>{description}</p>
        </div>
    )
}

export default RecipeCard