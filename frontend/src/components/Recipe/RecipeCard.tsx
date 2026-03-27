import React from "react"
import { useRouter } from 'next/navigation'
import { Recipe } from "../../app/types"
import * as S from "./index"

type RecipeCardProps = Recipe

const RecipeCard: React.FC<RecipeCardProps> = ({ id, title, createdAt, description }) => {
    const date = new Date(createdAt).toDateString()
    const router = useRouter();

    const handleNavigation = (id: string) => {
        router.push(`/recipes/${id}`)
    }
    return(
        <S.RecipeDiv onClick={() => handleNavigation(id)}>
            <S.RecipeTitle>{title}</S.RecipeTitle>
            <p>{date}</p>
        </S.RecipeDiv>
    )
}

export default RecipeCard