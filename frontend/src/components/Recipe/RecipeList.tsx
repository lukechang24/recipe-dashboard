'use client'
import { useQuery } from "@apollo/client/react";
import { GET_RECIPES } from "../../graphql/queries";
import { Recipe } from "../../app/types";
import RecipeCard from "./RecipeCard";
import * as S from "./index"

type RecipesQuery = {
    recipes: Recipe[]
}

type Props = { 
    selectedCategoryId: string
}

const RecipeList = ({ selectedCategoryId } : Props) => {
    const { loading, error, data } = useQuery<RecipesQuery>(GET_RECIPES, { variables: { categoryId: selectedCategoryId } })
    if (loading) return <p></p>
    if (error) return <p>error</p>
    if (!data) return null
    return(
        <S.RecipeListSection>
            {data.recipes.map((recipe) => (
                <RecipeCard key={recipe.id} {...recipe}/>
            ))}
        </S.RecipeListSection>
    )
}

export default RecipeList