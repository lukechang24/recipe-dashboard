import React from "react"
import { useRouter } from 'next/navigation'
import { Recipe } from "../../app/types"

type RecipeCardProps = Recipe

const RecipeCard: React.FC<RecipeCardProps> = ({ id, title, createdAt, description }) => {
    const dateObj = new Date(createdAt)
    const router = useRouter();

    const handleNavigation = (id: string) => {
        router.push(`/recipes/${id}`)
    }
    return(
        <div onClick={() => handleNavigation(id)}>
            <h1>{title}</h1>
            <p>{dateObj.toDateString()}</p>
            <p>{description}</p>
        </div>
    )
}

export default RecipeCard