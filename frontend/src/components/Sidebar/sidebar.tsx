'use client'
import React, { useState } from "react"
import { useQuery } from "@apollo/client/react";
import { GET_CATEGORIES } from "../../graphql/queries";
import { Categories } from "../../app/types";
import * as S from "./index"

type CategoriesQuery = {
    categories: [Categories]
}

type Props = { 
    selectedCategory: string
    setSelectedCategory: any
}

const Sidebar = ({ selectedCategory, setSelectedCategory } : Props) => {
    const { loading: categoriesLoading, error: categoriesError, data } = useQuery<CategoriesQuery>(GET_CATEGORIES)
    if (categoriesLoading) return <p>loading</p>
    if (categoriesError) return <p>error</p>
    return(
        <S.SidebarContainer>
            <S.CategoryContainer isActive={!selectedCategory} onClick={() => setSelectedCategory("")}>All Recipes</S.CategoryContainer>
            {data?.categories.map(category => {
                const { id, name } = category
                return(
                    <S.CategoryContainer 
                        isActive={selectedCategory === id}
                        key={id} 
                        onClick={() => setSelectedCategory(id)}>
                            {name}
                    </S.CategoryContainer>
                )
            })}
        </S.SidebarContainer>
    )
}

export default Sidebar
